<template>
  <div>

    <EditModeration
      :item="data"
      @update="getItem"
    />

    <div class="is-size-7 edit-info">
      Submitted {{ data.createdAt | date }}
      <span v-if="data.createdBy">by {{ data.createdBy.username }}</span>
    </div>

    <div class="edit-status">
      <span
        v-if="data.status === 'new'"
        class="tag is-light"
      >
        <b-icon
          icon="clock-outline"
          size="is-small"
        />
        Pending
      </span>
      <template v-if="data.status === 'approved'">
        <span class="tag is-success">
          <b-icon
            icon="check"
            size="is-small"
          />
          Approved
        </span>
        {{ data.approvedAt | date }}
        <span v-if="data.approvedBy">by {{ data.approvedBy.username }}</span>
      </template>
      <template v-if="data.status === 'rejected'">
        <span class="tag is-danger">
          <b-icon
            icon="close"
            size="is-small"
          />
          Rejected
        </span>
        {{ data.rejectedAt | date }}
        <span v-if="data.rejectedBy">by {{ data.rejectedBy.username }}</span>
      </template>
    </div>


    <div v-if="data.type === 'add'">

      <h2 class="is-size-6 bit">
        Following item has been added :
      </h2>

      <div class="banner banner-start add"/>
      <EditDetails
        :model="data.instanceModel"
        :item="data.after"
      />
      <div class="banner banner-end add"/>

    </div>
    <div v-if="data.type === 'edit' && changesList.length">

      <h2 class="is-size-6 bit">Changes list:</h2>

      <div
        v-if="changesList.length"
        class="tags"
      >
        <span
          v-for="fieldName in changesList"
          :key="fieldName"
          class="tag is-light"
          v-text="fieldName"
        />
      </div>

      <div class="banner banner-start remove"><span>BEFORE</span></div>
      <EditDetails
        :model="data.instanceModel"
        :item="data.before"
      />
      <div class="banner banner-end remove"><span>BEFORE</span></div>

      <div class="banner banner-start add"><span>AFTER</span></div>
      <EditDetails
        :model="data.instanceModel"
        :item="data.after"
      />
      <div class="banner banner-end add"><span>AFTER</span></div>

    </div>
    <b-message
      v-else-if="data.type === 'edit'"
      type="is-info"
    >
      No changes have been recorded.
    </b-message>
    <div v-else-if="data.type === 'delete'">

      <h2 class="is-size-6 bit">
        Following item has been removed :
      </h2>

      <div class="banner banner-start remove"/>
      <EditDetails
        :model="data.instanceModel"
        :item="data.before"
      />
      <div class="banner banner-end remove"/>

    </div>

  </div>
</template>

<script>
import _ from 'lodash'

import edits from '@/assets/configuration/edits'

import EditDetails from '@/components/details/Edit'
import EditModeration from '@/components/edits/Moderation'

export default {
  components: {
    EditDetails,
    EditModeration,
  },
  data () {
    return {
      data: {},
      edits,
    }
  },
  computed: {
    changesList () {
      return Object.keys(this.data.after).filter(fieldName => {
        return !_.isEqual(this.data.before[fieldName], this.data.after[fieldName])
      })
    },
  },
  created () {
    this.getItem()
  },
  methods: {
    async getItem () {
      try {
        const { data } = await this.$api.get('/edits/' + this.$route.params.id)
        this.data = data
      } catch (e) {
        this.apiError(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.edit-status {
  margin: .6em 0 1.6em;
}
h2 {
  margin-bottom: 1em;
}
$banner-size: 34px;
.banner {
  height: $banner-size;
  background-image: url(../../assets/images/caret-reverse.png);
  background-position: center;
  text-align: center;
  margin: 2em 0;
  span {
    display: inline-block;
    padding: 0 .5em;
    height: $banner-size;
    line-height: $banner-size;
    color: #fff;
    font-size: .9em;
    font-weight: bold;
  }
  &.add, &.add span {
    background-color: $success;
  }
  &.remove, &.remove span {
    background-color: $danger;
  }
  &.banner-end {
    background-image: url(../../assets/images/caret.png);
  }
}
</style>
