// CRUD Category
async function getDFByCategory() {
  sales_table.clear().draw();
  searches_table.clear().draw();
  var category = document.getElementById("selectCategoryByName").value;
  $.ajax({
    url: "/getResultByCat/" + category,
    type: "GET",
    dataType:"json",
    success: function (response) {
      
      const data_sales = response.data_sales;
      const data_searches = response.data_searches;
      if (data_sales.length > 0) {
        data_sales.map(item => {
          sales_table.row.add( [
                item['id_product'],
                item['name'],
                item['sales'],
                item['price'],
                item['category'],
                item['stock'],
        ] ).draw( false );
        })
      }

      if (data_searches.length > 0) {
        data_searches.map(item => {
          searches_table.row.add( [
                item['id_product'],
                item['name'],
                item['searches'],
                item['price'],
                item['category'],
                item['stock'],
        ] ).draw( false );
        })
      }
      
    },
    error: function (error) {
      console.log(error);
    }
  });
}