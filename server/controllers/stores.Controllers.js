const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Store = require("../models/stores.Models"); // Asegúrate de tener el archivo y la ruta correctos para el modelo

// Conexión a la base de datos
mongoose
  .connect("mongodb://localhost/crmdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Established a connection to the database"))
  .catch((err) => console.error("Error connecting to the database", err));

// Obtener todas las tiendas
router.get("/", async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (error) {
    console.error("Error al obtener todas las tiendas:", error);
    res.status(500).json({ message: "Error al obtener todas las tiendas" });
  }
});

// Obtener el detalle de una tienda por su ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findById(id);

    if (!store) {
      return res.status(404).json({ message: "Tienda no encontrada" });
    }

    res.json(store);
  } catch (error) {
    console.error("Error al obtener el detalle de la tienda:", error);
    res
      .status(500)
      .json({ message: "Error al obtener el detalle de la tienda" });
  }
});

// Añadir una nueva tienda
router.post("/add", async (req, res) => {
  try {
    const { storeName, number, openStatus } = req.body;

    if (!storeName || !number) {
      return res
        .status(400)
        .json({ message: "Se requieren el nombre de la tienda y el número" });
    }

    const newStore = new Store({ storeName, number, openStatus });
    await newStore.save();

    res.status(201).json(newStore);
  } catch (error) {
    console.error("Error al añadir una nueva tienda:", error);
    res.status(500).json({ message: "Error al añadir una nueva tienda" });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStoreData = req.body;

    // Encuentra y actualiza los detalles de la tienda con el ID proporcionado
    const updatedStore = await Store.findByIdAndUpdate(id, updatedStoreData, {
      new: true,
    });

    if (!updatedStore) {
      return res.status(404).json({ message: "Tienda no encontrada" });
    }

    res.json(updatedStore);
  } catch (error) {
    console.error("Error updating store details:", error);
    res.status(500).json({ message: "Error updating store details" });
  }
});

// Ruta para eliminar una tienda por su ID
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar la tienda por su ID y eliminarla de la base de datos
    const deletedStore = await Store.findByIdAndDelete(id);

    if (!deletedStore) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    console.error("Error deleting store:", error);
    res.status(500).json({ message: "Error deleting store" });
  }
});
module.exports = router;
