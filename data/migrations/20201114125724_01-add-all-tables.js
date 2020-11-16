//operators
//diners
//trucks
//operators_trucks
//diners_trucks

exports.up = function(knex) {
  return knex.schema

    //01-operators
    .createTable('operators', tbl=>{
      tbl.increments()
      ;
      tbl.text('username')
        .notNullable()
        .unique()
      ;
      tbl.text('password')
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
      ;
    })

    //02-diners
    .createTable('diners', tbl=>{
      tbl.increments()
      ;
      tbl.text('username')
        .unique()
        .notNullable()
      ;
      tbl.text('password')
        .notNullable()
      ;
      tbl.text('email')
        .unique()
        .notNullable()
      ;
      tbl.text('role')
        .notNullable()
      ;
      tbl.integer('location')
      ;
    })
    
    //03-trucks
    .createTable('trucks', tbl=>{
      tbl.increments()
      ;
      tbl.text('name')
        .notNullable()
      ;
      tbl.text('type')
        .notNullable()
      ;
      tbl.text('photoUrl')
      ;
      tbl.integer('location')
        .notNullable()
      ;
    })

    //04-menu_items
    .createTable('menu_items', tbl=>{
      tbl.increments()
      ;
      tbl.integer('truck_id')
        //fkey
        .references('id')
        .inTable('trucks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      ;
      tbl.text('name')
        .notNullable()
      ;
      tbl.text('description')
        .notNullable()
      ;
      tbl.integer('price')
        .notNullable()
      ;
    })

    //05-menu_ratings
    .createTable('menu_ratings', tbl=>{
      tbl.increments()
      ;
      tbl.integer('diner_id')
        //fkey
        .references('id')
        .inTable('diners')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      ;
      tbl.integer('menu_item_id')
        //fkey
        .references('id')
        .inTable('menu_items')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      ;
      tbl.integer('rating')
        .notNullable()
      ;
      tbl.text('photoUrl')
      ;
    })

    //06-operators_trucks
    .createTable('operators_trucks',tbl=>{
      tbl.increments()
      ;
      tbl.integer('operator_id')
        //fkey
        .references('id')
        .inTable('operators')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      ;
      tbl.integer('truck_id')
        //fkey
        .references('id')
        .inTable('trucks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      ;
    })

    //07-diners_trucks
    .createTable('diners_trucks',tbl=>{
      tbl.increments()
      ;
      tbl.integer('diner_id')
        //fkey
        .references('id')
        .inTable('diners')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      ;
      tbl.integer('truck_id')
        //fkey
        .references('id')
        .inTable('trucks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      ;
    })
    ;
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('operators')
    .dropTableIfExists('diners')
    .dropTableIfExists('trucks')
    .dropTableIfExists('menu_items')
    .dropTableIfExists('menu_ratings')
    .dropTableIfExists('operators_trucks')
    .dropTableIfExists('diners_trucks')
    ;
};
