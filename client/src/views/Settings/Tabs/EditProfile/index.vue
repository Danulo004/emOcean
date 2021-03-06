<template>
  <q-page>
    <q-form
      class="q-gutter-md"
      @submit="onSubmit"
      @reset="onReset"
    >

      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Avatar</div>
        </q-card-section>
        <q-card-section>
          <template v-if="!isNewAvatarSelected">
            <div class="row justify-center">
              <avatar :img="profile.avatar_url" />
            </div>
          </template>
          <template v-else>
            <edit-image
              :src="photoUrl"
              class="avatar"
              ref="avatarEditor"
              @on-created-blob="onCreatedAvatarBlob"
            />
          </template>
          <div class="row justify-center q-mt-sm">
            <label
              for="inputAvatar"
              ref="photoUrlLabel"
            >
              <input
                ref="avatar"
                type="file"
                id="inputAvatar"
                accept="image/*"
                @input="uploadImageUrl($event, 'avatar')"
                class="uploadImage"
              >
              <q-btn
                round
                color="secondary"
                icon="cloud_upload"
                @click="btnUploadPhotoUrl"
                class="q-mr-md"
              />
            </label>
            <q-btn
              round
              color="negative"
              icon="delete"
              @click="deletePhotoUrl"
            />
          </div>
        </q-card-section>
      </q-card>

      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Cover photo</div>
        </q-card-section>
        <q-card-section>
          <template v-if="!isNewCoverPhotoSelected">
            <div class="row justify-center">
              <img
                :src="profile.user_background !== '' ? profile.user_background : DefaultCoverPhoto"
                class="coverPhoto"
              />
            </div>
          </template>
          <template v-else>
            <edit-image
              class="backgroundImage"
              :src="backgroundUrl"
              :aspectRatio="aspectRatioRectangle"
              ref="coverPhotoEditor"
              @on-created-blob="onCreatedCoverPhotoBlob"
            />
          </template>
          <div class="row justify-center q-mt-sm">
            <label
              for="inputImage"
              ref="backgroundUrlLabel"
            >
              <input
                ref="background"
                type="file"
                id="inputImage"
                accept="image/*"
                @input="uploadImageUrl($event, 'background')"
                class="uploadImage"
              >
              <q-btn
                round
                color="secondary"
                icon="cloud_upload"
                @click="btnUploadBackgroundUrl"
                class="q-mr-md"
              />
            </label>
            <q-btn
              round
              color="negative"
              icon="delete"
              @click="deleteBackgroundUrl"
            />
          </div>
        </q-card-section>
      </q-card>

      <q-card class="my-card q-pb-md">
        <q-card-section>
          <div class="text-h6">Personal info</div>
        </q-card-section>
        <q-card-section>
          <q-input
            label="Username"
            placeholder="Add your username"
            v-model="profile.nickname"
            :rules="[requiredField, checkNicknameField]"
            lazy-rules
          />
          <q-input
            label="Bio"
            type="textarea"
            placeholder="Add a bio to your profile"
            v-model="profile.bio"
            autogrow
            counter
            :rules="[checkUserDescriptionField]"
          />
          <q-input
            label="Status"
            type="textarea"
            placeholder="Add a status to your profile"
            v-model="profile.status"
            autogrow
            counter
            :rules="[checkUserDescriptionField]"
          />
        </q-card-section>
      </q-card>

      <q-card class="my-card q-pb-sm">
        <q-card-section>
          <div class="text-h6">Social medias</div>
        </q-card-section>
        <q-card-section>
          <q-input
            label="YouTube"
            placeholder="Add YouTube link to your profile"
            v-model="profile.socialAccounts.youtube"
            :rules="[checkURL]"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon class="fab fa-youtube youtube" />
            </template>
          </q-input>
          <q-input
            label="Instagram"
            placeholder="Add Instagram link to your profile"
            v-model="profile.socialAccounts.instagram"
            :rules="[checkURL]"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon class="fab fa-instagram instagram" />
            </template>
          </q-input>
          <q-input
            label="Facebook"
            placeholder="Add Facebook link to your profile"
            v-model="profile.socialAccounts.facebook"
            :rules="[checkURL]"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon class="fab fa-facebook-f facebook" />
            </template>
          </q-input>
        </q-card-section>
      </q-card>

      <div class="q-pt-md">
        <q-btn
          label="Edit profile"
          type="submit"
          rounded
          color="secondary"
        >
          <q-spinner-bars
            class='q-ml-md'
            color='primary'
            size='1em'
            v-show='loading'
          />
        </q-btn>
        <q-btn
          label="Reset"
          type="reset"
          color="secondary"
          flat
          rounded
          class="q-ml-sm"
        />
      </div>

    </q-form>
  </q-page>
</template>

<script>
import DefaultCoverPhoto from '@/assets/img/cover_photo.jpg'
import Avatar from '@/components/Avatar.vue'
import EditImage from './EditImage.vue'
import {
  requiredField,
  checkNicknameField,
  checkUserDescriptionField,
  checkURL
} from '@/utilities/validation.js'
import authService from '@/services/auth.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Avatar,
    EditImage
  },

  data () {
    const emptyProfile = {
      nickname: '',
      bio: '',
      status: '',
      avatar_url: '',
      user_background: '',
      socialAccounts: {
        youtube: '',
        instagram: '',
        facebook: ''
      }
    }
    return {
      aspectRatioRectangle: 16 / 9,
      uploadPhotoMaxSize: 2097152,
      photoUrl: '',
      backgroundUrl: '',
      profile: { ...emptyProfile },
      emptyProfile,
      notifyParameters: {
        textColor: 'white',
        actions: [{ icon: 'close', color: 'white' }],
        timeout: 3000
      },
      isNewAvatarUploaded: false,
      isNewCoverPhotoUploaded: false,
      DefaultCoverPhoto,
      loading: false
    }
  },

  computed: {
    ...mapGetters({
      profileGetter: 'profile/myProfile'
    }),

    isNewAvatarSelected () {
      return this.photoUrl !== ''
    },

    isNewCoverPhotoSelected () {
      return this.backgroundUrl !== ''
    }
  },

  watch: {
    profileGetter (newValue) {
      this.loadDataFromStore()
    }
  },

  created () {
    this.getMyProfile()
  },

  methods: {
    ...mapActions({
      getMyProfile: 'profile/getMyProfile'
    }),

    btnUploadPhotoUrl () {
      this.$refs.photoUrlLabel.click()
    },

    deletePhotoUrl (val) {
      this.photoUrl = ""
      this.profile.avatar_url = ""
    },

    uploadImageUrl (val, imageType) {
      if (val.target.files[0].size > this.uploadPhotoMaxSize) {
        this.$q.notify({
          ...this.notifyParameters,
          color: 'negative',
          message: 'File is too big.'
        })
        if (imageType === 'background') {
          this.$refs.background.val = ""
        } else {
          this.$refs.avatar.val = ""
        }
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        if (imageType === 'background') {
          this.backgroundUrl = reader.result
        } else {
          this.photoUrl = reader.result
        }
      }
      reader.readAsDataURL(val.target.files[0])
    },

    btnUploadBackgroundUrl () {
      this.$refs.backgroundUrlLabel.click()
    },

    deleteBackgroundUrl (val) {
      this.backgroundUrl = ""
      this.profile.user_background = ""
    },

    onCreatedAvatarBlob (blob) {
      const avatarFormData = new FormData()
      avatarFormData.append('file', blob)

      authService.uploadAvatar(avatarFormData, { type: 'avatar' })
        .then((res) => {
          this.profile.avatar_url = res.data.imageUrl
          this.isNewAvatarUploaded = true
          this.sendProfile()
        })
        .catch(() => {
          this.loading = false
        })
    },

    onCreatedCoverPhotoBlob (blob) {
      const coverPhotoFormData = new FormData()
      coverPhotoFormData.append('file', blob)

      authService.uploadBackground(coverPhotoFormData, { type: 'background' })
        .then((res) => {
          this.profile.user_background = res.data.imageUrl
          this.isNewCoverPhotoUploaded = true
          this.sendProfile()
        })
        .catch(() => {
          this.loading = false
        })
    },

    onSubmit () {
      this.loading = true
      this.isNewAvatarUploaded = false
      this.isNewCoverPhotoUploaded = false
      if (this.isNewAvatarSelected) {
        this.$refs.avatarEditor.getCroppedData()
      }
      if (this.isNewCoverPhotoSelected) {
        this.$refs.coverPhotoEditor.getCroppedData()
      }
      this.sendProfile()
    },

    sendProfile () {
      if ((this.isNewAvatarSelected && !this.isNewAvatarUploaded) || (this.isNewCoverPhotoSelected && !this.isNewCoverPhotoUploaded)) {
        return
      }
      const profile = { ...this.profile, socialAccounts: [] }
      Object.keys(this.profile.socialAccounts).forEach(item => {
        profile.socialAccounts.push({ type: item, link: this.profile.socialAccounts[item] })
      })
      if (!profile.interests) { profile.interests = [] }

      this.$store.dispatch('profile/updateMyProfile', profile)
        .then(() => {
          this.$q.notify({
            ...this.notifyParameters,
            color: 'primary',
            message: 'Your profile was edited.'
          })
          this.photoUrl = ""
          this.backgroundUrl = ""
        })
        .catch(err => {
          this.$q.notify({
            ...this.notifyParameters,
            color: 'negative',
            message: err && err.response && err.response.data ? err.response.data.error : 'Unknown error.'
          })
        })
        .finally(() => {
          this.loading = false
        })
    },

    onReset () {
      this.loadDataFromStore()
      this.backgroundUrl = ""
      this.photoUrl = ""
    },

    loadDataFromStore () {
      const socialAccounts = {}
      if (this.profileGetter.socialAccounts) {
        this.profileGetter.socialAccounts.forEach(item => {
          socialAccounts[item.type] = item.link
        })
      }
      this.profile = { ...this.emptyProfile, ...this.profileGetter, socialAccounts }
      if (this.profile.avatar_url && JSON.stringify(this.profile.avatar_url) === JSON.stringify({})) {
        this.profile.avatar_url = ""
      }
      if (this.profile.user_background && JSON.stringify(this.profile.user_background) === JSON.stringify({})) {
        this.profile.user_background = ""
      }
    },

    requiredField,
    checkNicknameField,
    checkUserDescriptionField,
    checkURL
  }
}
</script>

<style scoped>
.q-avatar__content, .q-avatar img:not(.q-icon) {
  width: auto;
}

.coverPhoto {
  max-width: 500px;
}

.uploadImage {
  display: none;
}
</style>

<style>
.inputFile {
  display: none;
}

.inputFile .q-field__control:before, .q-field__control:after {
  content: none;
}

.avatar .cropper-view-box,
.avatar .cropper-face {
  border-radius: 50%;
}

.facebook {
  color: #3b5999;
}

.youtube {
  color: #FF0000;
}

.instagram {
  color: #e4405f;
}

.backgroundImage .vueCropperWrapper {
  max-width: 500px;
}
</style>
