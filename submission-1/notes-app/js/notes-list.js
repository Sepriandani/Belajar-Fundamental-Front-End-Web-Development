class NotesList extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML = `<div id="noteList" class="note-grid"></div>`
    }
}

customElements.define('notes-list', NotesList);