const { createNewReviews, fetchAllReviews, fetchReviewById, updateReviewById, deleteReviewById } = require("../reviews");
const { createNewUser } = require("../users")
const { createMessage } = require("../messages")
const passwordHasher = require("../passwordHasher")

async function fillTheDatabase() {

    console.log("started to fill the database")
    try {

        // ! CREATING REVIEWS

        //TODO LETS BEEF UP THE REVIEWS AND GET 10 

        const firstReview = await createNewReviews({
            "ideaName": "Halloween Candy is bad",
            title: "Candy is bad for your teeth",
            author: "Unfun-Karen",
            review: "We should all stop passing out candy to children on Halloween. Candy is very bad for children's teeth, I should know, I am a dentist. You should just trust me.",
            rating: 2,
            "imgURL": 'https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg'
        })
        const secondReview = await createNewReviews({
            "ideaName": "Star Trekin'",
            title: "Let's make star trek real!",
            author: "angryDave",
            review: "I am sick and tired of the way things are going on this planet. Let's make Star Trek real! Think about it, it's like going on a cruise, but in space!",
            rating: 4,
            "imgURL": 'https://techcrunch.com/wp-content/uploads/2022/06/Weird-Stock-Photography-Haje-Kamps-websize.jpeg'
        })

        const fourthReview = await createNewReviews({
            "ideaName": "Fishing without a license",
            title: "Don't bother getting a fishing license!",
            author: "The_Fisherman",
            review: "You don't need to bother getting a fishing license. As long as you don't fish in public lakes or ponds, where the fuzz might find you. Just stick to the rivers and the lakes that you're used to.",
            rating: 5,
            "imgURL": 'https://i.chzbgr.com/full/7443596800/h2494D3CE/this-might-not-be-such-a-great-idea'
        })
        const thirdReview = await createNewReviews({
            "ideaName": "skinny-dipping at the local rec center ",
            title: "don't swim in a public pool without a swimsuit",
            author: "lil_nick",
            review: "everyone was traumatized because i hadn't worked on my beach-bod",
            rating: 3,
            "imgURL": 'https://i.chzbgr.com/full/7443596800/h2494D3CE/this-might-not-be-such-a-great-idea'
        })
        const fifthReview = await createNewReviews({
            "ideaName": "Fish Love Cheese",
            title: "Bring Cheese when you fish",
            author: "The_Fisherman",
            review: "Next time you go fishing, bring some cheese. Fish go crazy for it, I swear! They particularly love Colby and Aged Gouda",
            rating: 3,
            "imgURL": 'https://i.chzbgr.com/full/7443596800/h2494D3CE/this-might-not-be-such-a-great-idea'
        })

        const sixthReview = await createNewReviews({
            "ideaName": "Coldrowave",
            title: "A microwave oven, but for making things cold",
            author: "aldofreddy",
            review: "Have you ever bought a pack of soda and wanted one as soon as you get home, but they are not cold yet? Let's put our brains together and develop a microwave, but for quickly making things cold",
            rating: 2,
            "imgURL": 'https://i.chzbgr.com/full/7443596800/h2494D3CE/this-might-not-be-such-a-great-idea'
        })

        const seventhReview = await createNewReviews({
            "ideaName": "Boo-seums",
            title: "Let's stop funding public museums",
            author: "Unfun-Karen",
            review: "Museums are boring and take a lot of public funding from our tax dollars. We should stop supporting these houses of culture. The general public has no need to learn or be inspired by the contents of a museum.",
            rating: 1,
            "imgURL": 'https://i.chzbgr.com/full/7443596800/h2494D3CE/this-might-not-be-such-a-great-idea'
        })

        const eighthReview = await createNewReviews({
            "ideaName": "Better HATS!",
            title: "We need better hat options in this world",
            author: "lil_nick",
            review: "I own a lot of different hats. I've bought 1 of every style of hat that exists. We need more hats for me to collect.",
            rating: 4,
            "imgURL": 'https://i.chzbgr.com/full/7443596800/h2494D3CE/this-might-not-be-such-a-great-idea'
        })

        const ninthReview = await createNewReviews({
            "ideaName": "Flying Cars",
            title: "Where are my flying cars?",
            author: "aldofreddy",
            review: "This isn't a new idea at all. When I was a young whipper-snapper, I dreamed of the day we would have flying cars. Now I'm all grown up and I don't see any flying cars. What happened to dreaming big? Airports are awful and airplanes are too cramped.",
            rating: 3,
            "imgURL": 'https://i.chzbgr.com/full/7443596800/h2494D3CE/this-might-not-be-such-a-great-idea'
        })

        const tenthReview = await createNewReviews({
            "ideaName": "D&D Class",
            title: "We should teach Dungeons and Dragons in school",
            author: "Snerding",
            review: "D&D is a fun role-playing game that requires the player to multi-task several different skills. During a game you constantly have to use math, imagination, collaboration, and understand common sense physics. D&D combines the classes of Math, Science, Language, and adds a layer of participation you don't normally see in those individual courses.",
            rating: 5,
            "imgURL": 'https://i.chzbgr.com/full/7443596800/h2494D3CE/this-might-not-be-such-a-great-idea'
        })
        console.log(" got through the reviews ")

        //! CREATING USERS

        //TODO LET CREATE MORE USERS MAYBE 5

        const firstUser = await createNewUser({
            firstName: "aldolfo",
            lastName: "freddy",
            username: "aldofreddy",
            password: await passwordHasher("password1")
        })

        const firstUser1 = await createNewUser({
            firstName: "Dave",
            lastName: "freddy",
            username: "angryDave",
            password: await passwordHasher("password1")
        })
        const firstUser2 = await createNewUser({
            firstName: "Nick",
            lastName: "freddy",
            username: "lil_nick",
            password: await passwordHasher("password1")
        })
        const firstUser3 = await createNewUser({
            firstName: "Jerry",
            lastName: "Tom",
            username: "The_Fisherman",
            password: await passwordHasher("password1")
        })
        const firstUser4 = await createNewUser({
            firstName: "Karen",
            lastName: "Karington",
            username: "Unfun-Karen",
            password: await passwordHasher("password1")
        })
        const firstUser5 = await createNewUser({
            firstName: "Steven",
            lastName: "Nerding",
            username: "Snerding",
            password: await passwordHasher("password1")
        })

        console.log("got through the users")

        //! REVIEW COMMENTS 

        //TODO THERE NEEDS TO BE 2 COMMENTS FOR EVERY ONE POST

        const firstMessage = await createMessage({
            message: "If you tried that in my hometown, you'd be thrown in the iron maiden. This is a bad idea!",
            title: "You're wrong!",
            author: "aldofreddy",
            reviewId: 1,
            rating: 1,
            userId: 2
        })

        const secondMessage = await createMessage({
            message: "The vegan teacher should be shot out of a cannon",
            title: "Hell no!",
            author: "angryDave",
            reviewId: 1,
            rating: 1,
            userId: 3
        })

        const thirdMessage = await createMessage({
            message: "I am also a dentist and this idea would cost me business.",
            title: "You're not very fun",
            author: "lil_nick",
            reviewId: 1,
            rating: 1,
            userId: 4
        })

        console.log("got through comments")


    } catch (error) {
        console.log("error filling the database with data /db/seed/seedFiller.js", error)
    }

}

module.exports = { fillTheDatabase }