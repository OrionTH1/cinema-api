const connection = require("../database/knex");
const ApiReturn = require("../utils/ApiReturn");

class MovieNotesControlller {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { id } = request.params;

    const user = await connection("users").where({ id }).first();
    if (!user) {
      throw new ApiReturn("User doesn't exists", null, 400);
    }

    if (!title || !description || !rating || !tags) {
      throw new ApiReturn(
        "Title, description, rating and tags is required!",
        null,
        400
      );
    }

    const [note_id] = await connection("movie_notes").insert({
      title,
      description,
      rating,
      user_id: id,
    });

    const tagsToInsert = tags.map((tag) => ({
      name: tag,
      note_id: note_id,
      user_id: id,
    }));

    await connection("movie_tags").insert(tagsToInsert);

    response.json(
      new ApiReturn("Movie note created successfully", {
        note_id,
        tags: tagsToInsert,
      })
    );
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await connection("movie_notes").where({ id }).first();
    const tags = await connection("movie_tags").where({ note_id: note.id });

    response.json(new ApiReturn("", { ...note, tags: [...tags] }));
  }

  async index(request, response) {
    let {
      title,
      description,
      rating,
      tags: tagsFilter,
      user_id,
    } = request.query;
    let notes;
    // console.log(title, description, rating, tagsFilter);

    title = !title ? "" : title;
    description = !description ? "" : description;
    rating = !rating ? "" : rating;
    tagsFilter = !tagsFilter ? [] : tagsFilter;

    tagsFilter.length &&
      (tagsFilter = tagsFilter.replaceAll(" ", "").toLowerCase().split(","));
    console.log(tagsFilter.length);

    if (tagsFilter.length) {
      notes = await connection("movie_notes")
        .innerJoin("movie_tags", "movie_notes.id", "movie_tags.note_id")
        .where({ "movie_notes.user_id": user_id })
        .whereLike("movie_notes.title", `%${title}%`)
        .andWhereLike("movie_notes.description", `%${description}%`)
        .andWhereLike("movie_notes.rating", `%${rating}%`)
        .whereIn(connection.raw("LOWER(movie_tags.name)"), tagsFilter)
        .select([
          "movie_notes.id",
          "title",
          "description",
          "rating",
          "created_at",
          "updated_at",
        ]);
    } else {
      notes = await connection("movie_notes")
        .select([
          "movie_notes.id",
          "movie_notes.title",
          "movie_notes.description",
          "movie_notes.rating",
          "movie_notes.created_at",
          "movie_notes.updated_at",
        ])
        .where({ "movie_notes.user_id": user_id })
        .whereLike("movie_notes.title", `%${title}%`)
        .andWhereLike("movie_notes.description", `%${description}%`)
        .andWhereLike("movie_notes.rating", `%${rating}%`);
    }

    const tags = await connection("movie_tags").where({ user_id });

    // Remove Duplicates
    const notesFilted = notes.filter(
      (note, index, array) => note.id != array[index - 1]?.id
    );

    const notesWithTags = notesFilted.map((note) => {
      const tagsFilted = tags.filter((tag) => tag.note_id == note.id);

      return { ...note, tags: [tagsFilted] };
    });

    response.json(new ApiReturn("", { notes: [...notesWithTags] }));
  }

  async update(request, response) {
    const { title, description, rating, tags } = request.body;
    const { id } = request.params;

    if (!title || !description || !rating || !tags) {
      throw new ApiReturn(
        "Title, description, rating and tags is required",
        null,
        400
      );
    }

    const note = await connection("movie_notes").where({ id }).first();

    if (!note) {
      throw new ApiReturn("Movie Note doesn't exists!", null, 400);
    }

    await connection("movie_tags").where({ note_id: id }).delete();

    const tagsToInsert = tags.map((tag) => ({
      name: tag,
      note_id: note.id,
      user_id: note.user_id,
    }));

    note.title = title;
    note.description = description;
    note.rating = Number(rating);

    await connection("movie_notes")
      .update({
        title,
        description,
        rating,
        updated_at: connection.raw("DATETIME('now')"),
      })
      .where({ id });
    await connection("movie_tags").insert(tagsToInsert);

    response.json(
      new ApiReturn("Movie note updated successfully", {
        ...note,
        tags: [...tagsToInsert],
      })
    );
  }

  async delete(request, response) {
    const { id } = request.params;

    const note = await connection("movie_notes").where({ id }).first();

    if (!note) {
      throw new ApiReturn("Movie Note doesn't exists!", null, 400);
    }

    const tags = await connection("movie_tags").where({ note_id: id });

    await connection("movie_notes").where({ id }).first().delete();

    response.json(
      new ApiReturn("Movie Note deleted successfully!", {
        ...note,
        tags: [...tags],
      })
    );
  }
}

module.exports = MovieNotesControlller;
