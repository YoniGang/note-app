const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push(
            {
                title: title,
                body: body
            }
        )
    
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()

    const notesToKeep = notes.filter((notes) => notes.title !== title)

    if (notesToKeep.length !== notes.length) {
        console.log(chalk.bgGreen('Note title: ' + title +  ' removed'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.bgRed('No note found!'))
    }
}

const readNotes = (title) => {
    const notes = loadNotes()
    const noteToFind = notes.find((note) => note.title === title)

    if (!noteToFind) {
        console.log(chalk.bgRed('Note not found!'))
    } else {
        console.log('Title: ' + chalk.blue(noteToFind.title))
        console.log('Body: ' + noteToFind.body)
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue('Your notes'))
    notes.forEach((note) => console.log(note.title))
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        return JSON.parse(dataBuffer.toString())
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes:readNotes
}