const router = require('express').Router();
const { Users, Posts, Comments } = require('../../models');
const withAuth = require('../../Utils/auth.js')

router.get ('/', async function (req, res) {
    try {
        const postData = await Posts.findAll({});
        res.status(200).json(postData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get ('/:id', async function (req, res) {
    try {
        const postData = await Posts.findByPk(req.params.id, {
            include: [
              Users,
              {
                model: Comments,
                include: [Users],
              },
            ],
          });

        //console.log(postData)
        if (postData){
        const post = postData.get({ plain: true})
        
           // console.log(post)
        res.render('p-one', {post})
         // res.status(200).json(postData);
        } 
        else {
        res.status(404).end
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post ('/', async function (req, res) {
    try {
        const postData = await Posts.create({...req.body, user_id: req.session.user_id});
        res.status(200).json(postData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.put ('/:id', async function (req, res) {
    try {
        const postData = await Posts.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(postData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.delete ('/:id', withAuth, async function (req, res) {
    try {
        const postData = await Posts.destroy({
            where: {
                id: req.params.id
            }
        });

        // const commentData = await Comments.destroy({
        //     where: {
        //         post_id: req.params.id
        //     }
        // });
        res.status(200).json(postData);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// router.delete('/:id', withAuth, async (req, res) => {
//     try {
//       const [affectedRows] = Posts.destroy({
//         where: {
//           id: req.params.id,
//         },
//       });
  
//       if (affectedRows > 0) {
//         res.status(200).end();
//       } else {
//         res.status(404).end();
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

module.exports = router;

