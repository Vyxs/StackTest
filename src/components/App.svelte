<script lang="ts">

    import sdk from '@stackblitz/sdk';

    let minimumWords: number = 3;
    let maximumWords: number = 10;
    $: generatedText = makeSentence(minimumWords, maximumWords);

    /*
    * Generates a random sentence. The sentence is created like this:
    * use generateRandomSentence(minimumWords, maximumWords) to generate a sentence with a minimum of minimumWords and a maximum of maximumWords.
    * then add dots and commas using the addDotsAndCommas() function.
    * finally capitalize the first letter of the sentence using the capitalizeFirstLetter() function.
    * return the sentence.
    * 
    * This function must be named makeSentence()
    */
    function makeSentence(minimumWords: number, maximumWords: number): string {
        let sentence: string = generateRandomSentence(minimumWords, maximumWords);
        sentence = addDotsAndCommas(sentence);
        sentence = capitalizeFirstLetter(sentence);
        return sentence;
    }

    /*
    * Take many sentences and capitalize the first word of each sentence.
    */
    function capitalizeFirstLetter(sentence: string): string {
        let sentences: string[] = sentence.split(".");
        for (let i: number = 0; i < sentences.length; i++) {
            let words: string[] = sentences[i].split(" ");
            sentences[i] = words[0].charAt(0).toUpperCase() + words[0].slice(1) + " " + words[1] + " " + words[2];
        }
        return sentences.join(".");
    }


     /*
    * Generate a integer between minimum and maximum using RandomSource.getRandomValues()
    */
    function generateRandomNumber(minimum: number, maximum: number): number {
        let random: Uint32Array = new Uint32Array(1);
        window.crypto.getRandomValues(random);
        let number: number = Math.floor(random[0] / (0xffffffff + 1) * (maximum - minimum + 1));
        return number + minimum;
    }

    /*
    * Take a text and add dots or commas, every n words, where n is a random number between 2 and 11.
    * example: "This is a sentence and this is a sentence too" -> "This is a sentence. and this, is a sentence too."
    * to generate n use generateRandomNumber(minimum, maximum).
    * if the text is empty, return an empty string.
    */
    function addDotsAndCommas(text: string): string {
        if (text == "") {
            return "";
        }
        let sentences: string[] = text.split(".");
        for (let i: number = 0; i < sentences.length; i++) {
            let words: string[] = sentences[i].split(" ");
            let n: number = generateRandomNumber(2, 11);
            let newSentence: string = "";
            for (let j: number = 0; j < words.length; j++) {
                if (j % n == 0 && j != 0) {
                    newSentence += ".";
                }
                newSentence += " " + words[j];
            }
            sentences[i] = newSentence;
        }
        return sentences.join(".");
    }
	
    /*
    * Generate random sentence using n words where n is a random number between minimumWords and maximumWords.
    * to generate n use generateRandomNumber(minimum, maximum)
    */
    function generateRandomSentence(minimumWords: number, maximumWords: number): string {
        let sentence: string = "";
        let n: number = generateRandomNumber(minimumWords, maximumWords);
        for (let i: number = 0; i < n; i++) {
            if (i == 0) {
                sentence += generateRandomWord();
            } else {
                sentence += " " + generateRandomWord();
            }
        }
        return sentence;
    }


    /*
    * Generate random word using getRandomLetter()
    */
    function generateRandomWord(): string {
        let word: string = "";
        let n: number = generateRandomNumber(3, 10);
        for (let i: number = 0; i < n; i++) {
            word += getRandomLetter();
        }
        return word;
    }

    /*
    * Generate random letter. Blacklisted characters: "zywklq"
    * Letter should be generated using a distribution based on frequency of letters in french language.^
    * Each letter should be generated with a certain probability stored in a dictionary.
    * The dictionary is the following:
    * Letter	Frequency
        e	15.10 %
        a	8.13 %
        s	7.91 %
        t	7.11 %
        i	6.94 %
        r	6.43 %
        n	6.42 %
        u	6.05 %
        l	5.68 %
        o	5.27 %
        d	3.55 %
        m	3.23 %
        c	3.15 %
        p	3.03 %
        é	2.13 %
        v	1.83 %
        h	1.08 %
        g	0.97 %
        f	0.96 %
        b	0.93 %
        q	0.89 %
        j	0.71 %
        à	0.54 %
        x	0.42 %
        è	0.35 %
        ê	0.24 %
        z	0.21 %
        y	0.19 %
        k	0.16 %
        ô	0.07 %
        û	0.05 %
        w	0.04 %
        â	0.03 %
        î	0.03 %
        ü	0.02 %
        ù	0.02 %
        ë	0.01 %
        œ	0.01 %
        ç	< 0.01 %
        ï	< 0.01 %
    */
    function getRandomLetter(): string {
        let letters: string[] = [
            "e", "a", "s", "t", "i", "r", "n", "u", "l", "o",
            "d", "m", "c", "p", "é", "v", "h", "g", "f", "b",
            "q", "j", "à", "x", "è", "ê", "z", "y", "k", "ô",
            "û", "w", "â", "î", "ü", "ù", "ë", "œ", "ç", "ï"
        ];
        let probabilities: number[] = [
            15.10, 8.13, 7.91, 7.11, 6.94, 6.43, 6.42, 6.05, 5.68, 5.27,
            3.55, 3.23, 3.15, 3.03, 2.13, 1.83, 1.08, 0.97, 0.96, 0.93, 
            0.89, 0.71, 0.54, 0.42, 0.35, 0.24, 0.21, 0.19, 0.16, 0.07, 
            0.05, 0.04, 0.03, 0.03, 0.02, 0.02, 0.01, 0.01, 0.01, 0.01
        ];
        let sum: number = 0;
        for (let i: number = 0; i < probabilities.length; i++) {
            sum += probabilities[i];
        }
        let randomNumber: number = Math.random() * sum;
        let sum2: number = 0;
        for (let i: number = 0; i < letters.length; i++) {
            sum2 += probabilities[i];
            if (randomNumber < sum2) {
                return letters[i];
            }
        }
        return letters[letters.length - 1];
    }

    /*
    * Copy the generated text to the clipboard.
    */
    function copyToClipboard() {
        let textarea: HTMLTextAreaElement = document.getElementById("generatedText") as HTMLTextAreaElement;
        textarea.select();
        document.execCommand("copy");
    }

    function embedGithubProject() {
        sdk.embedGithubProject('code', 'Vyxs/StackTest', {
             height: 600,
             origin: 'https://stackblitz.com/edit/'
        });
    };

</script>

<div>
    <!--
        Put a title describing what the program does.
    -->
    <h1>Generate random text</h1>
    <p>
        <label for="minWords">Min Words:
            <input type="number" bind:value={minimumWords}/>
            <input type="range" bind:value={minimumWords} max=1000/>
        </label>
    </p>
    <p>
        <label for="maxWords">Max Words:
            <input type="number" bind:value={maximumWords}/>
            <input type="range" bind:value={maximumWords} max=1000/>
        </label>
    </p>
    <textarea id="generatedText" bind:value={generatedText}/>
    <!--
        add a copy button to the textarea.
        when the button is clicked, copy the textarea value to the clipboard.
        use Svelte syntax to do this.
    -->
    <button on:click={copyToClipboard}>Copy</button>
    <!--
        add a button to the page that embeds the github project.
        use Svelte syntax to do this.
    -->
    <button on:click={embedGithubProject}>Code</button>
    <div id="code"></div>
</div>

<style lang="css">
    div {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        gap: 1em;
        padding: 1em;

        width: 50%;
        border-radius: var(--border-radius);
        background-color: var(--color-box);
    }

    h1 {
        font-size: 1.7em;
        font-weight: bold;
        color: var(--color-title);
    }

    label {
        color: var(--color-text);
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
        justify-content: space-evenly;
        align-items: center;
    }

    textarea {
        resize: vertical;
        width: 100%;
        min-height: 5em;
        height: 20em;
        padding: 1em;
        outline: none;
        color: var(--color-io-text);
        background-color: var(--color-io);
        border-radius: var(--border-radius);
        border: 1px solid var(--color-border);
    }

    input {
        border-radius: var(--border-radius);
        border: 1px solid var(--color-border);
        color: var(--color-io-text);
        padding: 0.5em;
        background-color: var(--color-io);
    }

    input[type="number"] {
        width: 5em;
    }

    /*
    * rounded button with a border. 
    */
    button {
        border-radius: var(--border-radius);
        border: 1px solid var(--color-border);
        color: var(--color-io-text);
        padding: 0.5em;
        background-color: var(--color-io);
    }

    /*
    * hover effect for the button.
    */
    button:hover {
        background-color: var(--color-io-hover);
    }

    /*
    * click effect for the button.
    */
    button:active {
        background-color: var(--color-io-active);
    }
</style>