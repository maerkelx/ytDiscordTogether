migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r8js60ybhjdn4zm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "brvidozh",
    "name": "set",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "oo8jxhoo8efsvqh",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r8js60ybhjdn4zm")

  // remove
  collection.schema.removeField("brvidozh")

  return dao.saveCollection(collection)
})
