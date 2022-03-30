class Category {
    constructor(data) {
        this.name = data.name.toLowerCase().trim();
    }

    set_docId(id) {
        this.docId = id;
    }

    toFirestore() {
        return {
            name: this.name,
        };
    }

    toFirestoreForUpdate() {
        const category = {};
        if (this.name) category.name = this.name;
        return category;
    }
}

export default Category;