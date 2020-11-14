//operators
//diners
//trucks
//operators_trucks
//diners_trucks


exports.up = function(knex) {
  return knex.schema
    .createTable('operators', tbl=>{
      tbl.increments()
      ;
      tbl.text('username',50)
        .notNullable()
        .unique()
      ;
      tbl.text('password',50)
        .notNullable();
      ; 
      tbl.text('email')
        .notNullable()
        .unique();
      ;
      tbl.text('role')
        .notNullable()
      ;
      tbl.integer('location')
        .unsigned()
      ;
    })
    ;
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('operators');
};
