class containerMongoose {
    constructor(collection) {
        this.collection = collection;
    }
    async save(elem){
        try{
            const added = new this.collection(elem);
            await added.save();
            return added;
        } catch {
            throw new Error(`Error al Insertar`)
        }
    }
    async getById(id){
        try{
            const element = await this.collection.findById(id).select({ __v: 0 }).lean();
            return element;
        }catch
        {
            throw new Error(`Error al Leer: Elemento no encontrado`)
        }
    }
    async getAll(){
        try{
            const elements = await this.collection.find().select({ __v: 0 }).lean();
            return elements;
        } catch {
            throw new Error('Error al Leer')
        }
        
    }
    async updateById(id, elem){
        try{
            const updated = await this.collection.findByIdAndUpdate(id, elem, { new: true });
            return updated;
        }
        catch{
            throw new Error(`Error al Actualizar: Elemento no encontrado`)
        }
    }
    populate(generateObject, cant = 100){
        const array = [];
        for (let i = 0; i < cant; i++) {
            array.push(generateObject());
        }
        return array;
    }
}

export default containerMongoose;