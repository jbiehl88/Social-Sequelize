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
})
