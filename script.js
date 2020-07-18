let root = document.getElementById("root");

class todoList{
    constructor(place, title = "to-do list"){

        this.place = place;
        this.cardArray = [];

        this.h2 = document.createElement('h2');
        this.h2.innerText = title;
        this.input = document.createElement('input');
        this.button = document.createElement('button');
        this.button.innerText = 'Add';

        this.button.addEventListener('click', ()=>{
            this.addToDo.call(this);
        });

        this.div = document.createElement('div');
        this.todoListElement = document.createElement('div');

        this.todoListElement.append(this.h2);
        this.todoListElement.append(this.input);
        this.todoListElement.append(this.button);
        this.todoListElement.append(this.div);
        this.todoListElement.classList.add("todoList");

        place.append(this.todoListElement);
    }

    addToDo(){
        let text = this.input.value;

        /*let card = document.createElement('div');
        card.innerText = text;
        this.div.append(card);*/

        this.cardArray.push(new Card(text, this.div, this));
    }
}


class Card{
    constructor(text, place, todoList){
        //this.text = text;
        this.place = place;
        this.todoList = todoList;
        this.state = {
            text: text,
            description: undefined,
            comments: [1,2,3]
        }
        this.render();
    }

    render(){
        this.card = document.createElement('div');
        this.card.classList.add("card");
        this.card.addEventListener('click', ()=>{
            this.showMenu.call(this);
        });

        this.p = document.createElement('p');
        this.p.innerText = this.state.text;

        this.deleteButton = document.createElement('button');
        this.deleteButton.innerText = "X";
        this.deleteButton.addEventListener('click', ()=>{
            this.deleteCard.call(this);
        });

        this.card.append(this.p);
        this.card.append(this.deleteButton);
        
        this.place.append(this.card);
    }

    deleteCard(){
        this.card.remove();
        let i = this.todoList.cardArray.indexOf(this);
        this.todoList.cardArray.splice(i,1);
    }

    showMenu(){//todoList1.cardArray[0].showMenu()

        //Create elements
        this.menu = document.createElement("div");
        this.menuContainer = document.createElement("div");
        this.menuTitle = document.createElement("div");
        this.menuDescription = document.createElement("div");
        this.commentsInput = document.createElement("input");
        this.commentsButton = document.createElement('button');
        this.menuComments = document.createElement("div");


        //Add class names
        this.menu.className = "menu";
        this.menuContainer.className = "menuContainer";
        this.menuTitle.className = "menuTitle";
        this.menuDescription.className = "menuDescription";
        this.menuComments.className = "menuComments";
        this.commentsInput.className = "commentsInput";
        this.commentsButton.className = "commentsButton";

        //Add inner Text
        this.menuTitle.innerText = this.state.text;
        //this.menuDescription.innerText = this.state.description;
        this.menuComments.innerText = this.state.comments.toString();
        this.commentsButton.innerText = "Add";

        //Event listeners
        this.menuContainer.addEventListener('click', (e)=>{
            console.log(e.target);
            if(e.target.classList.contains("menuContainer")){
                this.menuContainer.remove();
            }
        });
        
        this.commentsButton.addEventListener('click', ()=>{
            this.state.comments.push(this.commentsInput.value);
            this.menuComments.innerText = this.state.comments.toString();
            console.log(this.state);
        })

        //Append
        this.menu.append(this.menuTitle);
        this.menu.append(this.menuDescription);
        this.menu.append(this.commentsInput);
        this.menu.append(this.commentsButton);
        this.menu.append(this.menuComments);
        this.menuContainer.append(this.menu);
        this.place.append(this.menuContainer);

        this.editableText = new EditableText(this.state.description, this.menuDescription, this);
    }
}

class EditableText{
    constructor(text, place, card){
        this.text = text;
        this.place = place;
        this.card = card;
        this.render();
    }

    render(){
        this.div = document.createElement("div");
        this.p = document.createElement("p");

        this.p.innerText = this.text;

        this.p.addEventListener('click', ()=>{
            this.showEditableTextArea.call(this);
        });

        this.div.append(this.p);
        this.place.append(this.div);
    }

    showEditableTextArea(){
        let oldText = this.text;

        this.input = document.createElement('textarea');
        this.saveButton = document.createElement("button");

        this.p.remove();
        this.input.value = oldText;
        this.saveButton.innerText = "Save";

        this.saveButton.addEventListener('click', ()=>{
            this.text = this.input.value;
            this.card.state.description = this.input.value;
            this.div.remove();
            this.render();
        });

        this.div.append(this.input);
        this.div.append(this.saveButton);
    }
}



let todoList1 = new todoList(root);
let todoList2 = new todoList(root);
let todoList3 = new todoList(root);

todoList1.input.value = "asdasds";
todoList1.addToDo();
todoList1.cardArray[0].showMenu();