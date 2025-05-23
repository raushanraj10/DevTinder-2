authRouter
    Post/singup
    post/login
    post/logout

profileRouter
    get/profile/view
    patch/profile/edit
    patch/profile/password

requestRouter
    post/request/send/interested/:userid
    post/request/send/ignored/:userid
    post/request/send/accepted/:requestid
    post/request/send/rejected/:requestdid

userRouter
    get/user/connection
    get/user/request
    get/user/feed