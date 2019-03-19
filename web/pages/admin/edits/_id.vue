<template>
  <div>

    <div
      v-if="data.status === 'new'"
      class="topright"
    >
      <button
        class="button bit is-success"
        @click.prevent=""
      >
        <b-icon icon="check"/>
        APPROVE
      </button>
      <button
        class="button bit is-danger"
        @click.prevent=""
      >
        <b-icon icon="close"/>
        REJECT
      </button>
      <button
        class="button bit is-light"
        @click.prevent="$router.go(-1)"
      >
        CANCEL
      </button>
    </div>
    <div
      v-else
      class="topright"
    >
      <button
        class="button bit is-light"
        @click.prevent="$router.go(-1)"
      >
        BACK
      </button>
    </div>

    <div class="is-size-7 edit-info">
      Submitted {{ data.createdAt }}
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
        {{ data.approvedAt }}
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
        {{ data.rejectedAt }}
        <span v-if="data.rejectedBy">by {{ data.rejectedBy.username }}</span>
      </template>
    </div>


    <div v-if="data.type === 'add'">

      <h2 class="is-size-6 bit">
        Following item has been added :
      </h2>

      <div class="banner banner-start add"/>
      <EditDetails
        :model="data.modelName"
        :item="after"
      />
      <div class="banner banner-end add"/>

    </div>
    <div v-if="data.type === 'edit'">

      <h2 class="is-size-6 bit">Review changes :</h2>

      <div class="tags">
        <span
          v-for="fieldName in Object.keys(after)"
          :key="fieldName"
          class="tag is-light is-rounded"
          v-text="fieldName"
        />
      </div>

      <div class="banner banner-start remove"><span>BEFORE</span></div>
      <EditDetails
        :model="data.modelName"
        :item="before"
      />
      <div class="banner banner-end remove"><span>BEFORE</span></div>

      <div class="banner banner-start add"><span>AFTER</span></div>
      <EditDetails
        :model="data.modelName"
        :item="after"
      />
      <div class="banner banner-end add"><span>AFTER</span></div>

    </div>
    <div v-else-if="data.type === 'delete'">

      <h2 class="is-size-6 bit">
        Following item has been removed :
      </h2>

      <div class="banner banner-start remove"/>
      <EditDetails
        :model="data.modelName"
        :item="before"
      />
      <div class="banner banner-end remove"/>

    </div>

    <pre>data => {{ data }}</pre>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import edits from '@/assets/configuration/edits'

import EditDetails from '@/components/details/Edit'

export default {
  components: {
    EditDetails,
  },
  data () {
    return {
      data: {},
      edits,
    }
  },
  computed: {
    before () {
      if (!this.data.before) return
      try {
        return JSON.parse(this.data.before)
      } catch (e) {
        this.$toast.open({
          message: 'Could not parse entry item',
          type: 'is-danger',
          position: 'is-bottom',
        })
      }
    },
    after () {
      if (!this.data.after) return
      try {
        return JSON.parse(this.data.after)
      } catch (e) {
        this.$toast.open({
          message: 'Could not parse entry item',
          type: 'is-danger',
          position: 'is-bottom',
        })
      }
    },
  },
  created () {
    this.getItems()
  },
  methods: {
    async getItems () {
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
  background-image: url(../../../assets/images/caret-reverse.png);
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
    background-image: url(../../../assets/images/caret.png);
  }
}
</style>
