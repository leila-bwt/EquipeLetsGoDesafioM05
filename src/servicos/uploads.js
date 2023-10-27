const aws = require('aws-sdk');

const endpoint = aws.Endpoint(process.env.ENDPOINT_BACKBLAZE)

const s3 = new aws.S3({
    endpoint: endpoint,
    credentials:{
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
})

const uploadImagem = async (path, buffer, mimetype) => {
    const imagem = s3.upload({
        Bucket: process.env.BUCKET_NAME,
        Key: path,
        Body: buffer,
        ContentType: mimetype,
}).promise()

return {
    path: imagem.Key,
    url: `http://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_S3}/${imagem.Key}`
}
}

const excluirImagem = async (path) => {
    await s3.deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: path
    }).promise()
}

module.exports = {
    uploadImagem,
    excluirImagem
}