<template>
  <div>
    <NuxtLink to="/Questionpage">Ask a question</NuxtLink>
    <h1>popular</h1>
    <div class="fq-question__wrapper">
      <question
        v-for="text in questions"
        :key="text.id"
        :question="text.question"
        :answer="text.answer"
      />    
    </div>
  </div>
</template>
<script>
import question from '@/components/question'
export default {
  name: 'Faq',
  components: {
    question,
  },
  data() {
    return {
      questions: [
        {
          id: 1,
          question: 'What is BoardGame?',
          answer:
            'BoardGameGeek (BGG) is a board game database - a collection or catalog of data and information on traditional board games. The game information recorded here is intended for posterity, historical research, and user-contributed ratings. All the information within our database was meticulously and voluntarily entered on a game-by-game basis by our user base - You. This information is freely offered through flexible queries and "data mining.',
        },
        {
          id: 2,
          question: 'Is BGG a work and family friendly site?',
          answer:
            'No. There are many games featured on the site that contain uncensored adult or morbid content. As a database and information resource we prioritized accuracy when it comes to database entries and never censor game titles, images, videos, or other material associated with these games. You must be at least 18 years of age to create an account and anyone under the age of 16 is not permitted to use the site. You view BGG at your own risk.',
        },
        {
          id: 3,
          question: 'Do I need to register to use BGG?',
          answer:
            'Yes and No. You don t need to register to look at anything on this site. You can browse all of the BGG pages anonymously if you want to. However, if you want to add anything, or change anything, such as asking a question in a forum, replying to a question, adding a game to the database or creating your own Geek List, then you will need to register. Registration is free and your details are not passed on to other organizations. You will need an email address but, other than that, no other details need be factual.When registering, you will be asked to choose a user name. This cannot be changed at a later date, so think carefully about what you want to use. You can change the description that goes with your user name, but the user name itself cannot be changed. For example, my user name is "dipdragon" and the description is "J R". I can change "J R" to anything I choose, but "dipdragon',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped></style>
