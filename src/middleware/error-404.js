module.exports = (req, res) => {
  res.render('../views/error/404', {
    title: 'Ошибка'
  })
}