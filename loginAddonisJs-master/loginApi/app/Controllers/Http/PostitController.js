'use strict'

const Postit = use('App/Models/Postit');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with postits
 */
class PostitController {
  /**
   * Show a list of all postits.
   * GET postits
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const postits = await Postit.query().with('user').fetch();

    return postits;
  }


  /**
   * Create/save a new postit.
   * POST postits
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const data = request.only(['content']);
    const postit = await Postit.create({ user_id: auth.user.id, ...data });

    return postit;
  }

  /**
   * Display a single postit.
   * GET postits/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const postit = await Postit.findOrFail(params.id);

    return postit;
  }

  /**
   * Delete a postit with id.
   * DELETE postits/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const postit = await Postit.findOrFail(params.id);

    if (postit.user_id =! auth.user.id) {
      return response.status(401);
    }

    await postit.delete();
  }
}

module.exports = PostitController
