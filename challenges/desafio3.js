db.movies.aggregate([
  { $match:
    {
      "imdb.rating": { $gte: 7 },
      $or: [{ rated: "PG" }, { rated: "G" }],
      genres: { $nin: ["Crime", "Horror"] },
      languages: { $all: ["English", "Spanish"] },
    },
  },
  { $project:
    {
      _id: 0,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
  { $sort:
    {
      ano: -1, notaIMDB: -1, titulo: 1,
    },
  },
]);
