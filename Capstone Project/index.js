import { render } from "ejs";
import express from "express";

const app = express();
const port = 3000;

let blogPost = [];

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render("feed.ejs", {blogPost: blogPost});
  });

app.get("/contact", (req, res) => {
	res.render("contact.ejs");
});

app.get('/makePost', (req, res) => {
	res.render("makePost.ejs")
 });

app.post("/submitPost", (req, res) => {
	const newTitle = req.body.title;
	const newCont = req.body.message;

	const newPost = {
		id: blogPost.length,
		title: newTitle,
		content: newCont
	};

	blogPost.push(newPost);

	res.redirect("/");
});

app.post("/delete/:postId", (req, res) => {
	const postId = parseInt(req.params.postId);

	if (postId >= 0 && postId < blogPost.length) {
		blogPost.splice(postId, 1);
	}
	res.redirect("/");
});

app.get("/edit/:postId", (req, res) => {
	const postId = parseInt(req.params.postId);
	res.render("makePost.ejs", {title: blogPost[postId].title,
		content: blogPost[postId].content,
		postId: blogPost[postId].id
	});
});

app.post("/submitEdit/:postId", (req, res) => {
	const postId = parseInt(req.params.postId);
	const newTitle = req.body.title;
	const newCont = req.body.message;

	const editedPost = {
		id: postId,
		title: newTitle,
		content: newCont
	};

	blogPost[postId] = editedPost;

	res.redirect("/");
});

app.get("/post/:postId", (req, res) => {
	const postId = parseInt(req.params.postId);

	res.render("post.ejs", {title: blogPost[postId].title,
		content: blogPost[postId].content,
		postId: blogPost[postId].id
	});

});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
  });
