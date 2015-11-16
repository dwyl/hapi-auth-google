## 1 - Create a project

Open the Google Developer Console: https://console.developers.google.com  
click the "**Select a project**" selector, then click: ***Create a project***
![google-auth-01-create-a-project](https://cloud.githubusercontent.com/assets/194400/11185849/b891335c-8c76-11e5-8960-e8691eff2b30.png)

## 2 - Name your New Project

Give your project a name and then click "**Create**"

![google-auth-02-new-project-name](https://cloud.githubusercontent.com/assets/194400/11186083/e90593d8-8c77-11e5-9988-962eabfdc9f3.png)

## 3 - Enable an API

Now you need to enable an API

![google-auth-03-enable-api](https://cloud.githubusercontent.com/assets/194400/11186184/6f56781c-8c78-11e5-9e99-6b582fce7ecd.png)

## 4. Find and Enable the Google+ API

The recommended API for Authentication is Google+ ("Plus"):

![google-auth-04-scroll-to-find-google api](https://cloud.githubusercontent.com/assets/194400/11187228/9302414c-8c7d-11e5-8579-95b20e5c7d52.png)

## 5. Enable the API

As if you had not clicked enough, you still have to click "***Enable API***":

![google-auth-05-enable-google api](https://cloud.githubusercontent.com/assets/194400/11187368/07373ac2-8c7e-11e5-968b-2e373fd118b4.png)

Then click on the "***Credentials***" link in the left-hand menu.

## 6. Add Credentials

![google-auth-06-credentials](https://cloud.githubusercontent.com/assets/194400/11188610/ad8e8cae-8c83-11e5-8e77-444f9bff555d.png)

## 7. OAuth Consent Screen

This is the info that will be displayed for people using your app
when you ask them to Authorize your app to use their Google Account:

![google-auth-07-credentials](https://cloud.githubusercontent.com/assets/194400/11188870/f59426a2-8c84-11e5-8c14-816daa662d96.png)

## 8. Set the Origin & Redirect URIs

This part is important as the redirect URI will need to match
what you define in your app's `REDIRECT_URL` option.

![google-auth-08-credentials-define-origins-and-callback](https://cloud.githubusercontent.com/assets/194400/11189078/f715f716-8c85-11e5-8253-f738b13bdbd3.png)

## 9. Get your Client ID and Secret

Once you have done that you will be shown a modal with your **client ID**
and **client secret**:

![google-auth-09-client-id](https://cloud.githubusercontent.com/assets/194400/11189393/c7eb8d6e-8c87-11e5-8785-46f0857c334f.png)

Copy the two keys and export them in your project
see: Step 3 of the Readme. 
