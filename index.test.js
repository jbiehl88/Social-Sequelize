const { Comment, Like, Post, Profile, User } = require("./index")
const { db } = require("./db/connection.js")

describe("Social Sequelzie Test", () => {
	/**
	 * Runs the code prior to all tests
	 */
	beforeAll(async () => {
		// the 'sync' method will create tables based on the model class
		// by setting 'force:true' the tables are recreated each time the test suite is run
		await db.sync({ force: true })
	})

	// Write your tests here

	test("User Create", async () => {
		const testUser = await User.create({ username: "JohnB", email: "JohnB@OBX.com" })
		expect(testUser.username).toBe("JohnB")
	})

	it("Profile Create", async () => {
		const testProfile = await Profile.create({ bio: "Surfer", profilePicture: "surfing.jpg", birthday: "1/8/2000" })
		expect(testProfile.bio).toBe("Surfer")
	})

	it("Post Create", async () => {
		const testPost = await Post.create({ title: "Surfing is fun", body: "seriously", createdAt: "1/1/2024" })
		expect(testPost.body).toBe("seriously")
	})

	it("Comment Create", async () => {
		const testComment = await Comment.create({ body: "SURFS UP", createdAt: "1/7/2024" })
		expect(testComment.body).toBe("SURFS UP")
	})

	it("Like Create", async () => {
		const testLike = await Like.create({ reactionType: "Thumbs up", createdAt: "1/7/2024" })
		expect(testLike.reactionType).toBe("Thumbs up")
	})

	it("test User/Profile association", async () => {
		const user = await User.create({ username: "Aaron", email: "JohnB@OBX.com" })
		const profile = await Profile.create({ bio: "Surfer", profilePicture: "surfing.jpg", birthday: "1/8/2000" })
		await profile.setUser(user)
		const userWithProfile = await User.findOne({
			where: {
				username: "Aaron",
			},
			include: Profile,
		})
		// console.log(JSON.stringify(userWithProfile, null, 2))
		expect(userWithProfile.Profile.bio).toEqual("Surfer")
	})

	it("test User/Post association", async () => {
		const user = await User.create({ username: "Josh", email: "JohnB@OBX.com" })
		const post = await Post.create({ title: "Surfing is fun", body: "seriously", createdAt: "1/1/2024" })
		await post.setUser(user)
		const userWithPost = await User.findOne({
			where: {
				username: "Josh",
			},
			include: Post,
		})
		// console.log(JSON.stringify(userWithPost, null, 2))
		expect(userWithPost.Posts[0].body).toBe("seriously")
	})

	it("test Post/Comment association", async () => {
		const post = await Post.create({ title: "Surfing is rad", body: "totally", createdAt: "1/3/2024" })
		const comment = await Comment.create({ body: "SURFS UP", createdAt: "1/7/2024" })
		await comment.setPost(post)
		const postWithComment = await Post.findOne({
			where: {
				title: "Surfing is rad",
			},
			include: Comment,
		})
		// console.log(JSON.stringify(postWithComment, null, 2))
		expect(postWithComment.Comments[0].body).toBe("SURFS UP")
	})

	it("test User/Like association", async () => {
		const user = await User.create({ username: "Barb", email: "JohnB@OBX.com" })
		const like = await Like.create({ reactionType: "Thumbs up", createdAt: "1/7/2024" })
		await like.addUser(user)
		const userWithLike = await User.findOne({
			where: {
				username: "Barb",
			},
			include: Like,
		})
		// console.log(JSON.stringify(userWithLike, null, 2))
		expect(userWithLike.Likes[0].reactionType).toBe("Thumbs up")
	})
})
