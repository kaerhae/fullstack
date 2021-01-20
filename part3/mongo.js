const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@fullstackcluster.jjjny.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,

})

const Phonebook = new mongoose.model('Phonebook', personSchema)


const nameInput = process.argv[3]

const numberInput = process.argv[4]

if (process.argv.length<4) {
    console.log("päästiinkötänne?")
    Phonebook.find({})
    .then(result => {
        result.forEach(person => {
            console.log(person)
            mongoose.connection.close()

        })
        process.exit(1)

    })
}

const phonebook = new Phonebook({
    name: nameInput,
    number: numberInput,
})

phonebook.save()
.then(response => {
    console.log(`Added ${nameInput} number ${numberInput} to phonebook`)
    mongoose.connection.close()
})