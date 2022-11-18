<template>
  <div>
    <template v-if="question_type_id === 'w06o1o-g8hy1x'">
      <single-choice-questions :question_type_id="question_type_id" ref="form" />
    </template>
    <template v-if="question_type_id === '7iuhwq-tq4fwb'">
      <multiple-choice-questions :question_type_id="question_type_id" ref="form" />
    </template>
    <template v-if="question_type_id === 'f06o1o-j8hy1x'">
      <judgment-questions :question_type_id="question_type_id" ref="form" />
    </template>
  </div>
</template>

<script>
import SingleChoiceQuestions from './SingleChoiceQuestions.vue'
import MultipleChoiceQuestions from './MultipleChoiceQuestions.vue'
import JudgmentQuestions from './JudgmentQuestion.vue'
export default {
  name: 'create-drawer',
  props: {
    question_type_id: String
  },
  components: {
    SingleChoiceQuestions,
    MultipleChoiceQuestions,
    JudgmentQuestions
  },
  methods: {
    onSubmit () {
      return this.$refs.form.onSubmit()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
