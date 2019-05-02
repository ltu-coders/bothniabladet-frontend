
function getImages(searchTerm) {
     let testData = []
    for (let i = 1; i <= 13; i++) {
        let data = {
            "imageId": i,
            "fileName": i + '.jpg',
            "filePath": "test_images/",
            "author": {
                "userId": 1,
                "userName": "fredrik",
                "firstName": "Fredrik",
                "lastName": "Harnevik",
                "email": "a@b.com",
                "userType": "användare",
                "discount": "",
                "passwordHash": "sdjkasd",
                "passwordSalt": "qwdqwd"
            },
            "description": "Ny beskrivning",
            "resolution": "1920*1080",
            "width": 2000,
            "height": 1000,
            "fileSize": "34555",
            "dateTime": "2019-04-28T15:32:04.585",
            "make": "Nikon",
            "model": "D60",
            "location": "I stan",
            "licenseType": "cc",
            "noOfAllowedUses": 3,
            "price": 2000,
            "tags": [
                {
                    "tagId": 3,
                    "tagName": "jord"
                },
                {
                    "tagId": 1,
                    "tagName": "luleå"
                },
                {
                    "tagId": 2,
                    "tagName": "vatten"
                }
            ]
        }
        testData.push(data)
    }
    return testData
}

function getImage(ImageId) {
    return {
        "imageId": ImageId,
        "fileName": ImageId + '.jpg',
        "filePath": "test_images/",
        "author": {
            "userId": 1,
            "userName": "fredrik",
            "firstName": "Fredrik",
            "lastName": "Harnevik",
            "email": "a@b.com",
            "userType": "användare",
            "discount": "",
            "passwordHash": "sdjkasd",
            "passwordSalt": "qwdqwd"
        },
        "description": "Ny beskrivning",
        "resolution": "1920*1080",
        "width": 2000,
        "height": 1000,
        "fileSize": "34555",
        "dateTime": "2019-04-28T15:32:04.585",
        "make": "Nikon",
        "model": "D60",
        "location": "I stan",
        "licenseType": "cc",
        "noOfAllowedUses": 3,
        "price": 2000,
        "tags": [
            {
                "tagId": 3,
                "tagName": "jord"
            },
            {
                "tagId": 1,
                "tagName": "luleå"
            },
            {
                "tagId": 2,
                "tagName": "vatten"
            }
        ]
    }
}

export {getImages, getImage}