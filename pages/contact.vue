<template>
  <div class="bg-col">
    <section class="c-contactPage">
      <div class="c-contactPage__form">
        <h1>Contact</h1>
        <form @submit.prevent="createQuestion" @submit="resetForm">
          <div class="round-input-names">
            <div class="round-input">
              <div class="round-input-container">
                <div class="round-input-decorator">
                  <div class="round-input-border-left"></div>
                  <label class="round-input-label-text"> First Name </label>
                  <div class="round-input-border-right"></div>
                </div>
                <input v-model="firstname" type="text" />
              </div>
            </div>
            <div class="round-input">
              <div class="round-input-container">
                <div class="round-input-decorator">
                  <div class="round-input-border-left"></div>
                  <label class="round-input-label-text"> Last Name </label>
                  <div class="round-input-border-right"></div>
                </div>
                <input v-model="lastname" type="text" />
              </div>
            </div>
          </div>
          <div class="round-input">
            <div class="round-input-container">
              <div class="round-input-decorator">
                <div class="round-input-border-left"></div>
                <label class="round-input-label-text"> email </label>
                <div class="round-input-border-right"></div>
              </div>
              <input v-model="email" type="text" />
            </div>
          </div>
          <div class="round-textarea">
            <div class="round-input-container">
              <div class="round-input-decorator">
                <div class="round-input-border-left"></div>
                <label class="round-input-label-text"> Your question </label>
                <div class="round-input-border-right"></div>
              </div>
              <textarea v-model="question" placeholder=""></textarea>
            </div>
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <!-- <Logo class="logo" /> -->
    </section>
  </div>
</template>
<script>
// import Logo from '~/components/Logo'
export default {
  name: 'Faqquestion',
  // components: { Logo },

  data() {
    return {
      firstname: '',
      lastename: '',
      email: '',
      question: '',
    }
  },
  computed: {
    questionBody() {
      return JSON.stringify({
        first_name: this.firstname,
        last_name: this.lastename,
        email: this.email,
        question: this.question,
      })
    },
    isLoggedIn() {
      return this.$store.getters['faq/isLoggedIn']
    },
  },
  methods: {
    createQuestion() {
      this.$axios('/items/contact_form_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: this.questionBody,
      })
        .then((response) => {
          // TODO: notify user
          console.log(response.data)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    resetForm(event) {
      event.target.reset()
    },
  },
}
</script>

<style lang="scss">
.bg-col {
  // background: linear-gradient(rgba(129, 203, 235, 0.767), #ffffff 100%);
  background-color: rgba($bluegreen, 0.8);
  transform: skewY(-20deg);
  margin-bottom: 18rem;
}
.c-contactPage {
  // @include flexCenter();
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: auto;

  &__form {
    @include flexCenter();
    flex-direction: column;
    text-align: center;
    flex: 1;
    width: 100%;
    max-width: 1200px;
    transform: skewY(20deg);

    h1 {
      color: #ea5d30;
    }
    form {
      width: 90%;
      margin: auto;
      @include flexCenter();
      flex-direction: column;
      justify-content: space-evenly;
      .round-input-names {
        @include flexCenter();
        justify-content: space-between;
        width: 100%;
        .round-input {
          width: 49%;
        }
      }
      .round-input {
        width: 100%;
      }
      .round-input-container {
        display: inline-block;
        position: relative;
        margin: 10px 0;
        flex-direction: column;
        width: 100%;
        .round-input-decorator {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-flow: row nowrap;
        }

        .round-input-label-text {
          font-size: 0.8em;
          color: white;
          padding: 0 4px;
          transform: translate(0, -8px);
          white-space: nowrap;
        }

        .round-input-border-left {
          flex: 0 0 10px;
          box-sizing: border-box;
          height: 100%;
          border-radius: 10px 0 0 10px;
          border: 1px solid white;
          border-right: none;
        }
        .round-input-border-right {
          flex: 1 0 50px;
          border-radius: 0 10px 10px 0;
          border: 1px solid white;
          border-left: none;
        }

        input {
          width: 100%;
          height: 50px;
          position: relative;
          font-size: 1em;
          padding: 13px 20px 13px 15px;
          min-width: 200px;
          border: none;
          background: none;
          border-radius: 10px;
          border-bottom: 1px solid white;
          outline: none;
          &:focus {
            box-shadow: 1px 1px 3px 0 #ea5f3094;
          }
        }
      }
    }
    .round-textarea {
      width: 100%;
      .round-input-container {
        @include flexCenter();
        display: inline-block;
        position: relative;
        margin: 10px 0;
        flex-direction: column;
        width: 100%;
        .round-input-decorator {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-flow: row nowrap;
        }

        .round-input-label-text {
          font-size: 0.8em;
          color: white;
          padding: 0 4px;
          transform: translate(0, -8px);
          white-space: nowrap;
        }

        .round-input-border-left {
          flex: 0 0 10px;
          box-sizing: border-box;
          height: 100%;
          border-radius: 10px 0 0 10px;
          border: 1px solid white;
          border-right: none;
        }
        .round-input-border-right {
          flex: 1 0 50px;
          border-radius: 0 10px 10px 0;
          border: 1px solid white;
          border-left: none;
        }
        textarea {
          width: 100%;
          height: 100px;
          position: relative;
          font-size: 1em;
          padding: 13px 20px 13px 15px;
          min-width: 200px;
          border: none;
          background: none;
          border-radius: 10px;
          border-bottom: 1px solid white;
          outline: none;
          display: flex;
        }
      }
    }

    button {
      background-color: white;
      color: $orange;
      font-weight: 700;
      font-size: 1rem;
      padding: 1rem 3rem;
      border: none;
      border-radius: 10px;
      outline: none;
      cursor: pointer;
      &:focus {
        box-shadow: 1px 1px 3px 0 rgba(129, 203, 235);
      }

      &:hover {
        background-color: $orange;
        color: white;
      }
    }
  }
}

@media screen and (max-width: $large) {
  .round-input-names {
    display: flex;
    flex-direction: column;
    .round-input {
      width: 100% !important;
      min-width: 200px;
    }
  }

  .round-input-decorator {
    min-width: 200px;
  }

  .round-input-container {
    min-width: 200px;
  }

  .c-contactPage__form {
    form {
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
}
</style>
