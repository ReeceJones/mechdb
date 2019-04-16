<template>
  <div class="highscores">
    <div class="header">HIGH SCORES</div>
    <div
      v-for="(item, i) in items"
      :key="item.username"
      :class="{ 'ranking-first': i === 0 }"
      class="ranking"
    >
      <div class="rank">
        <template v-if="i === 0">
          1ST
        </template>
        <template v-else-if="i === 1">
          2ND
        </template>
        <template v-else-if="i === 2">
          3RD
        </template>
        <template v-else>
          {{ i + 1 }}TH
        </template>
      </div>
      <div class="name">
        {{ item.username }}
      </div>
      <div class="rep">
        <b-icon
          v-if="i === 0"
          icon="crown"
          size="is-small"
        />
        {{ item.rep }}
      </div>
    </div>
    <div class="score-tabs">
      <a
        :class="{ 'is-active': tab === 'monthly' }"
        @click.prevent="tab = 'monthly'"
      >
        MONTHLY
      </a>
      <a
        :class="{ 'is-active': tab === 'weekly' }"
        @click.prevent="tab = 'weekly'"
      >
        WEEKLY
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { username: 'ReeceJones', rep: 1739 },
        { username: 'Kironto', rep: 1212 },
        { username: 'TheAlchemist', rep: 801 },
        { username: 'Snorlax', rep: 492 },
        { username: 'Kartsims', rep: 439 },
      ],
      tab: 'monthly',
    }
  },
}
</script>

<style lang="scss" scoped>
.highscores {
  padding: 1em;
  font-family: '8bit';
  letter-spacing: -0.15em;
  background: $dark;
  color: $light;
  font-size: .75em;
}
.header {
  text-align: center;
  padding: 1em 0 1.5em;
  color: #fff;
}
.ranking {
  display: flex;
  padding: .5em 0;
  &.ranking-first {
    color: $warning;
  }
  .rank {
    width: 45px;
  }
  .name {
    flex-grow: 1;
    text-transform: uppercase;
  }
  .rep {
    white-space: nowrap;
  }
}
.icon.is-small {
  font-size: 1.3em;
}
.score-tabs {
  margin: 2em 0 1.5em;
  text-align: center;
  a {
    display: inline-block;
    padding: .3em .75em;
    color: $light;
    border-radius: .25em;
    &.is-active {
      background: $primary;
      color: #fff;
    }
  }
}
</style>
