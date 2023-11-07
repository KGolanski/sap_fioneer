
class mainPage {
    
    newToDo(taskName) {
        cy.get('div').find('input[data-cy="add-todo"]').type(`${taskName}{enter}`)
    }

    clickAddNewBtn() {
        cy.get('#add-btn').click()
    }
    
    addTestData() {
        cy.fixture('tasks.json').then((list) => {
            list.forEach((item) => { this.newToDo(item.title) })
            })
    }

    markFirstTaskCompleted() {
        cy.get('ul').find('input[type="checkbox"]').first().check()
    }

    markLastTaskCompleted() {
        cy.get('ul').find('input[type="checkbox"]').last().check()
    }

    lastRow(list, row) {
        return cy.get(list).first().find(row).last()
    }

    navigation = {
    
        moveToCompletedTab:() => {
            cy.get('button[id="active"]').click()
        },
    
        moveToActiveTab:() => {
            cy.get('button[id="active"]').click()
        },
    }
}

module.exports = new mainPage();
