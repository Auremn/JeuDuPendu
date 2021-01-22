import './App.css';
import React, { Component } from 'react'
import Letter from './Lettre'
import shuffle from 'lodash.shuffle'



const ALPHABET = 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
const PHRASE = ["abrege","apercu","approximation","carotte","copie","demonstration","eprouvette","espece"]

class App extends Component {

    state = {
        letters: this.generateLetter(),
        usedLetters: [],
        phraseU: this.generatePhrase(),
        motScript: "",
        nbVie: 11,
        reset: false,
    };

    generateLetter() {
        const result = []
        const lstLettres = ALPHABET.split(' ')
        for (let i=1;i<27;i++) {
            const letr = lstLettres.pop()
            result.unshift(letr)
        }
        return result
    };

    generatePhrase() {
        const candidates = shuffle(PHRASE)
        const result = candidates.pop()
        console.log(result)
        return result
    };

    // for binding
    handleCardClick = index => {
        const { motScript,phraseU } = this.state;
        let { nbVie,reset } = this.state;

        if (nbVie<=0 || (motScript.length === phraseU.length)) {
            this.setState({reset: false})
            return
        }


        if (!reset) {
            const { letters,usedLetters, phraseU } = this.state;

            let nbBadTry = this.state.nbVie
            let test = phraseU.indexOf(letters[index])
            if (test === -1) nbBadTry--
            this.setState({nbVie: nbBadTry})

            if (usedLetters.includes(letters[index])) {
                return
            }
            usedLetters.push(letters[index])
            this.computeDisplay(phraseU,usedLetters)
        }
        return

    }

    // Si une lettre de la
    // phrase est dans usedLettres, alors on affiche la lettre
    computeDisplay(phrase, usedLetters) {


        const result = phrase.replace(/\w/g,    (letter) => (
            usedLetters.includes(letter) ? letter : ' _ '))
        this.setState({ motScript: result})
        return result
    }

    relaunchNewGame = () => {
        const phraseU = this.generatePhrase()
        const letters = this.generateLetter()
        const usedLetters = []
        const motScript = ""
        const nbVie = 11
        const reset = false

        this.setState({ letters, usedLetters, phraseU, motScript, nbVie, reset })
    }

    render() {
        const { letters,motScript,phraseU } = this.state;
        const win = motScript.length === phraseU.length
        let nbBadTry = this.state.nbVie



        return(
            <div className="JeuDuPendu">
                <div className="Intro">
                    <h1>Jeu du Pendu</h1>
                    <p>Pour commencer une partie, veillez chosir votre premiere lettre</p>
                </div>
                <div className="Clavier">
                    {letters.map((lettre, index) => (
                        <Letter
                            letter={lettre}
                            onClick={this.handleCardClick}
                            index={index}
                            key={index}/>
                    ))}
                </div>
                <p>Nombre de Vie restante: {nbBadTry}</p>
                <div className="DevineMot">
                    {motScript}
                </div>

                {win &&
                <div className="WinScreen">
                    <p>GG C'est win</p>
                    <button className="success" onClick={this.relaunchNewGame}>
                        Recommencer une nouvelle partie
                    </button>
                </div>
                }

                {nbBadTry<=0 &&
                <div className="WinScreen">
                    <p>GG T'es vraiment nul</p>
                    <button className="success" onClick={this.relaunchNewGame}>
                        Recommencer une nouvelle partie
                    </button>
                </div>
                }
            </div>
            )
    };
}

export default App
