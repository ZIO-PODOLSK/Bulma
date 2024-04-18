<template>
  <div class="wrapper">
    <div class="title text-has-centered">Мой список</div>
    <form @submit.prevent="addMessage">
      <div class="field is-grouped mb-5">
        <div class="control">
          <input
            v-model="newToDoCon"
            class="input"
            type="text"
            placeholder="текст"
          />
        </div>
        <div class="control">
          <button :disabled="!newToDoCon" class="button is-info">
            Добавить
          </button>
        </div>
      </div>
    </form>

    <div v-for="item in toDolist" :key="item" class="card mb-5">
      <div class="card-content mb-5">
        <div class="content">
          <div class="columns is-vcentered">
            <div class="column">{{ item.text }}</div>
            <div class="column has-text-right">
              <button class="button mr-1">&check;</button>
              <button class="button">&cross;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//зависимости
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

//данные
//const list = ref([
//   { id: "id1", text: "text1", isDone: false },
//   { id: "id2", text: "text2", isDone: false },
//   { id: "id3", text: "text3", isDone: false },
//]);

//обработчики
const toDolist = ref([]);
const newToDoCon = ref("");
const addMessage = () => {
  const newList = { id: uuidv4(), text: newToDoCon.value, isDone: false };
  // console.log(newList);
  toDolist.value.push(newList);
  newToDoCon.value = "";
  // newList.value.push(newList)
};
//компоненты
</script>

<style>
@import url("bulma/css/bulma.min.css");
.field {
  border: 1px solid black;
}
.wrapper {
  margin: 0 auto;
}
.card {
  max-width: 323px;
}
</style>