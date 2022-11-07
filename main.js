const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('conectado correctamente');
    const db = client.db(dbName);
    const bibloteca = db.collection('libros');



    //insert
    const insertArrObjeto = await bibloteca.insertMany([{ "Nombre": "El hobbit", "Autor": "J.R.R.Tolkien", "Editorial": "Planeta", "Año de edición": 1937 },
    { "Nombre": "The lord of the rings", "Autor": "J.R.R.Tolkien", "Editorial": "De bolsillo", "Año de edición": 1954 },
    { "Nombre": "Las aventures de Tom Bombadil", "Autor": "J.R.R.Tolkien", "Editorial": "Penguin Books", "Año de edición": 1934 },
    { "Nombre": "Los hijos de Húrin", "Autor": "J.R.R.Tolkien", "Editorial": "Planeta", "Año de edición": 2007 }])

    
    //=====================mostrar el api==============================
    const findResult = await bibloteca.find().toArray();//find = encontrar
    console.log('4-1 =>', findResult);


    //=====================filtrar por mayor===========================
    const Mayor2000 = await bibloteca.find({"Año de edición": {$gte : 2000}}).toArray();
    console.log('4-2 =>', Mayor2000)


    //=====================Mostrar por nombre solamente================
    const viewName = await bibloteca.find({"Editorial": "Planeta"},{"Nombre":1}).toArray();
    console.log('4-3 =>' , viewName)


    //======================And y ocultar id===========================
    const viewEdit = await bibloteca.find({$and:[{"Año de edición": {$gte: 1930}},{"Año de edición": {$lt:1940}}]},{projection:{_id:0}}).toArray();
    console.log('4-4 =>' , viewEdit)          


    //======================Agregar datos==============================
    const viewSet = await bibloteca.updateMany({"Nombre": "Los hijos de Húrin"},{$set:{"stock":37}})
    
    const mostrarSet = await bibloteca.find({"Nombre": "Los hijos de Húrin"}).toArray();//find = encontrar
    console.log('5-1 =>',mostrarSet);
    

    //=====================Agregar todos los Datos====================
    const viewSetAll = await bibloteca.updateMany({"Autor": "J.R.R.Tolkien"},{$set:{"stock":37}})
    
    const mostrarSetAll = await bibloteca.find().toArray();//find = encontrar
    console.log('5-2 =>',mostrarSetAll);
    

   /*  const viewId = await bibloteca.updateMany({ "Nombre": "El hobbit"},{$set:{_id:1}})
    const SetAllId = await bibloteca.find({ "Nombre": "El hobbit"}).toArray();
    console.log('5-3 =>',SetAllId); */

    //=======================Elimina el libro==========================
    const deleteOne = await bibloteca.deleteOne({"Nombre": "Las aventures de Tom Bombadil"})
    const viewDelete = await bibloteca.find().toArray();
    console.log('6-1 =>',viewDelete)

    //=======================Elimina 2 libros==========================
    const deleteMany = await bibloteca.deleteMany({"Año de edición":{$eq: 1937}})
    const viewDelete_Many = await bibloteca.find().toArray();
    console.log('6-2 =>', viewDelete_Many)


    //=======================Insertar libro============================
    const reseña = await bibloteca.insertOne({ "Nombre": "Innador", "Autor": "J.R.R.Tolkien", "Editorial": "Gallito", "Año de edición": 2022,"Valoracion": 5,"Reseña":"Muy buen libro"})
    const viewReview = await bibloteca.find().toArray();
    console.log('7-1 =>', viewReview)
   
   
    //=======================Agregar Reseña1===========================
    const insertReview = await bibloteca.updateMany({"Nombre": "Innador"},{$set:{"Reseña1":"Gran libro"}})
    const insertReview2 = await bibloteca.updateMany({"Nombre": "Innador"},{$set:{"Reseña2":"Muy recomendable"}})
    const view_Ins_Review = await bibloteca.find().toArray();
    console.log('7-2 =>', view_Ins_Review)

    
    //=======================Agregar Genro==========================
    const insertGender  = await bibloteca.updateOne({"Nombre": 'The lord of the rings'}, {$set:{'Genero':'Terror'}})
    const insertGender2 = await bibloteca.updateOne({"Nombre": 'Los hijos de Húrin'}, {$set:{'Genero':'Accion'}})
    const insertGender4 = await bibloteca.updateOne({"Nombre": 'Innador'}, {$set:{'Genero':'Fantasia'}})
    const viewInsert = await bibloteca.find().toArray();
    console.log('7-3 =>', viewInsert)

    await bibloteca.drop()//limpia la consola cuando enviamos otro codigo

    return 'done.';
}

main()
    .then(x => console.log(x))
    .catch(console.error)
    .finally(() => client.close());