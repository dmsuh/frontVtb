<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header" elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-img width="72px" :src="logoVtb"/>
        </q-toolbar-title>

        <div>Разработано Группой №7 WEB</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import logoVtb from 'assets/logoVtb.svg'
</script>
