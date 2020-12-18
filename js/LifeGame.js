(function(){

    let Life = function (canvas_size,size) {
        this.unitSize = canvas_size / size;
        this.world = [];
        
        for (let i = 0; i < size; i++) {
            this.world[i] = [];
            for (let j = 0; j < size; j++) {
                this.world[i][j] = false;
            }
        }
    
        let get = (copy, col, row) => {
    
            if (col >= 0 && col < copy.length && row >= 0 && row < copy.length)
                return copy[col][row];
            return false;
        }
    
        this._countNeighbors = function (copy, col, row) {
            let count = 0;
    
            if (get(copy, col - 1, row - 1)) count++;
            if (get(copy, col, row - 1)) count++;
            if (get(copy, col + 1, row - 1)) count++;
            if (get(copy, col + 1, row)) count++;
            if (get(copy, col + 1, row + 1)) count++;
            if (get(copy, col, row + 1)) count++;
            if (get(copy, col - 1, row + 1)) count++;
            if (get(copy, col - 1, row)) count++;
            return count;
        }
    
    }
    Life.prototype.setUnits = function () {
    
        for (let i = 0; i < arguments.length; i += 2) {
            this.world[arguments[i]][arguments[i + 1]] = true;
        }
    }
    
    Life.prototype.update = function () {
        let copy = [];
        for (let e of this.world) {
            copy.push(e.slice(0));
        }
    
        for (let i = 0; i < copy.length; i++) {
            for (let j = 0; j < copy[i].length; j++) {
                let count = this._countNeighbors(copy, i, j);
                if (this.world[i][j]) {
                    if (count < 2 || count > 3)
                        this.world[i][j] = false;
                } else {
                    if (count == 3)
                        this.world[i][j] = true;
                }
            }
        }
    }
    Life.prototype.render = function (context) {
    
        for (let i = 0; i < this.world.length; i++) {
            for (let j = 0; j < this.world[0].length; j++) {
                if (this.world[i][j]) context.fillRect(i * this.unitSize, j * this.unitSize, this.unitSize, this.unitSize);
            }
        }
    }
    Life.prototype.set=function(col){
        let copy=[];
        for(let i=0;i<col;i++){
            copy[i]=[];
            for(let j=0;j<col;j++){
                if(i<this.world.length)
                    copy[i][j]=this.world[i][j];
                else    
                copy[i][j]=false;
            }
        }
        this.world=copy;

    }
    Life.prototype.clear=function(){
        for (let i = 0; i < this.world.length; i++) {
            for (let j = 0; j < this.world[0].length; j++) {
                this.world[i][j]=false;
            }
        }
    }
    Life.prototype.getSize = function () {
        return this.world.length;
    }
    window.LifeGame=Life;
    
})();



