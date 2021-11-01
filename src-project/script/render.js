import {DataCollector} from "./dataCollector.js";

export class Render {
    constructor() {
        this.dataCollector = new DataCollector();
        this.dataCategories = null;
        this.dataCategory = {};
        this.buildCategories();
    }

    async buildCategories() {
        this.dataCategories = await this.loadData('https://api.publicapis.org/categories');
        this.renderCategories();
        this.onClickButton();
        this.addListenerCategory();
    }

    async loadCategory(name) {
        let correctedName = name.split(' ')[0].toLowerCase();
        let data = await this.loadData(`https://api.publicapis.org/entries?category=${correctedName}`);
        this.addToDataCategory(name, data.entries);
        this.renderCategory(name);
    }

    addToDataCategory = (key, prop) => this.dataCategory.key = prop;

    getFromDataCategory = (key) => {
        let data = this.dataCategory;
        return data.key;
    }

    renderCategory(str) {
        let dataCategories = this.getFromDataCategory(str);
        let category = [...document.querySelectorAll('.dropdown-category')]
            .filter(el => el.innerHTML === str)
            .shift();
        let titleWrapper = document.createElement("div");
        titleWrapper.classList.add("sub-dropdown-menu")

        for (let i = 0; i < 3; i++) {
            let title = Object.values(dataCategories[i])[0]
            titleWrapper.insertAdjacentHTML('beforeend', `<p class="title">${title}</p>`)
            }
        category.insertAdjacentElement('beforeend', titleWrapper)
    }

    async loadData(url) {
        return await this.dataCollector.getData(`${url}`)
            .then(data => data)
            .then(body => body)
            .catch(({message}) => console.log(`Error `, message));
    }

    renderCategories() {
        let dropdown = document.querySelector('.myDropdown');
        for (let element of this.dataCategories) {
            dropdown.insertAdjacentHTML('beforeend', `<div class="dropdown-category">${element}</div>`);
        }
    }

    onClickButton() {
        document.body.addEventListener('click', function (e) {
            if (e.target.classList.contains("drop-btn")) {
                document.querySelector('.dropdown-categories').classList.toggle("show");
            }
        })
    }

    addListenerCategory = () => {
        let categories = document.querySelectorAll('.dropdown-category')
        categories.forEach(category => category.addEventListener('click', this.addCategory))
    }

    addCategory = (e) => {
        this.clearSubmenu()
        this.loadCategory(`${e.target.innerHTML}`);
    }

    clearSubmenu = () =>{
        let subMenu = document.querySelector('.sub-dropdown-menu');
        if (subMenu) subMenu.remove();
    }
}
