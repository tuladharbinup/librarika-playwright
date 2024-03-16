// @ts-check
const { test, expect, request } = require('@playwright/test');
// accessToken is reused by all tests in the file.
let accessToken;

test.beforeAll(async ({ request }) => {
    //sending request to login endpoint url
    const response = await request.post('https://api.realworld.io/api/users/login', {
        data: {
            "user": {
                "email":"toxofe8476@namewok.com", 
                "password":"toxofe8476@namewok.com"
                }
             }  
        }); 

    const responseBody = await response.json();
    accessToken = responseBody.user.token;
});

test.describe('api tests for feed', () => {
    test('check Global feed link is working', async ({ page }) => {
    //actual UI URL just for reference purpose
    await page.goto('https://angular.realworld.how/');
    await expect(page.locator('.navbar-brand')).toHaveText('conduit');
    });

    test('create and delete an article feed', async ({ page, request }) => {
        //sending request to new article endpoint url
        const articleResponse =await request.post('https://api.realworld.io/api/articles/', {
            data: {
                "article": {"title": "Random number", "description": "Here is description generator", "body": "my artickle", "tagList": ["random"]}
            },
            headers:{
                Authorization: `Token ${accessToken}`
            }
        });
        expect(articleResponse.status()).toEqual(201);

        //sending request to delete article endpoint url using slug id
        const articleResponseBody = await articleResponse.json();
        const slugID = await articleResponseBody.article.slug;
        const deleteArticleResponse = await request.delete(`https://api.realworld.io/api/articles/${slugID}`, {
            headers:{
                Authorization: `Token ${accessToken}`
            }
            }); 
        expect(deleteArticleResponse.status()).toEqual(204);
    });
});
  