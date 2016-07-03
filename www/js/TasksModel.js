function getTasks() {
    this.items = [
        {nome: "Tarefa 1", finalizada: false},
        {nome: "Tarefa 2", finalizada: false}
     ];

     this.remove = function(item) {
         var pos = this.items.indexOf(item);
         this.items.splice(pos, 1);
     };

     this.add = function(item) {
         this.items.push(item);
     };
}