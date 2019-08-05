const TypeWriter = function(textElement, textwords, wait = 3000) {
    this.textElement = textElement;
    this.textwords = textwords;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

TypeWriter.prototype.type = function() {
    const current = this.wordIndex % this.textwords.length;
    const fullText = this.textwords[current];

    if (this.isDeleting) {
        this.txt = fullText.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullText.substring(0, this.txt.length + 1);
    }

    this.textElement.innerHTML = `<span class="txt" id="cursor">${this.txt}</span>`

    let typeSpeed = 300;

    if (this.isDeleting) {
        typeSpeed /= 5;
    }

    if (!this.isDeleting && this.txt === fullText) {
        typeSpeed = this.wait;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
    }
    if (this.txt != "Developer") {
        myvar = setTimeout(() => this.type(), typeSpeed);
    } else {
        document.querySelector(".txt").style.animation = "blink-cursor .75s step-end infinite";
        window.addEventListener("click", function(event) {
            window.location.href = "index2.html";
        });
    }
}


document.addEventListener('DOMContentLoaded', init);

function init() {
    const textElemment = document.querySelector('.txt-typ');
    const words = JSON.parse(textElemment.getAttribute('data-words'));
    const wait = textElemment.getAttribute('data-wait');

    new TypeWriter(textElemment, words, wait);
}