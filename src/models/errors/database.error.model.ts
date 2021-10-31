class DataBaseError extends Error{
    
    constructor(
        public message: string, //é o mesmo que fazer 'this.message= message'
        public error?: any
    ){
        super(message)
    }

}

export default DataBaseError;