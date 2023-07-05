# Back-End

// a bit more advanced

// empty route error handler
server.get("*", (req, res) => {
  res.status(404).send({
    success: false,
    error: {
      name: "404 - Not Found",
      message: "No route found for the requested URL",
    },
    data: null,
  });
});


//Simpler

// error handler
server.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  res.send({
    name: error.name, 
    message: error.message  
  });
});