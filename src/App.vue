<script setup>
//зависимости
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

//данные
const todosCollectionRef = collection(db, "todos");
const todosCollectionOrder = query(todosCollectionRef, orderBy("date", "asc"));
const toDolist = ref([]);
const newToDoCon = ref("");

//firebase

onMounted(() => {
  onSnapshot(todosCollectionOrder, (querySnapshot) => {
    const fbToDos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        text: doc.data().text,
        isDone: doc.data().isDone,
      };
      fbToDos.push(todo);
    });
    toDolist.value = fbToDos;
  });
});

//обработчики
const delMessage = (id) => {
  deleteDoc(doc(todosCollectionRef, id));
};

const togglerDone = (id) => {
  const ind = toDolist.value.findIndex((item) => item.id === id);
  toDolist.value[ind].isDone = !toDolist.value[ind].isDone;
  const change = doc(todosCollectionRef, id);
  updateDoc(change, {
    isDone: toDolist.value[ind].isDone,
  });
};

const addMessage = () => {
  const docRef = addDoc(todosCollectionRef, {
    text: newToDoCon.value,
    isDone: false,
    date: Date.now(),
  });
  newToDoCon.value = "";
};
</script>

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

    <div
      v-for="item in toDolist"
      :key="item"
      class="card mb-5"
      :class="{ 'has-background-success-light': item.isDone }"
    >
      <div class="card-content mb-5">
        <div class="content">
          <div class="columns is-vcentered">
            <div :class="{ 'has-text-success': item.isDone }" class="column">
              {{ item.text }}
            </div>
            <div class="column has-text-right">
              <button
                @click="togglerDone(item.id)"
                :class="item.isDone ? 'is-success' : 'is-light'"
                class="button mr-1"
              >
                &check;
              </button>
              <button v-on:click="delMessage(item.id)" class="button">
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


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