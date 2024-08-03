class ArchiveList extends HTMLElement {
  constructor() {
    super()
    this.render()
  }

  render() {
    this.innerHTML = `<div id="archivedNoteList" class="note-grid"></div>`
  }
}

customElements.define('archive-list', ArchiveList)
