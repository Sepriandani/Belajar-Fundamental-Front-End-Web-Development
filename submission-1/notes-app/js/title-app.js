class TitleApp extends HTMLElement {
    static get observedAttributes() {
        return ['title'];
    }
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    set title(value) {
        const hasChange = this.title != value;
        if (hasChange) {
        this.removeAttribute('title');
        }
    
        this.setAttribute('title', value);
    }
    
    get title() {
        const value = this.getAttribute('title');
        return value;
    }

    render() {
        this.emptyContent();
        this.innerHTML += `<h1>${this.title}</h1>`
    }

    emptyContent() {
        this.innerHTML = '';
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Render konten ulang
        this.render();
    }
}

customElements.define('title-app', TitleApp);