class AddNote extends HTMLElement {
  constructor() {
    super()
    this.render()
  }

  render() {
    this.innerHTML = `
            <form id="noteForm">
                <input type="text" id="noteTitle" placeholder="Title">
                <textarea id="noteBody" placeholder="Write your note here..."></textarea>
                <div id="errorMsg" class="error-msg"></div>
                <button type="submit" id="submitBtn">Add Note</button>
            </form>
        `
  }
}

customElements.define('add-note', AddNote)
