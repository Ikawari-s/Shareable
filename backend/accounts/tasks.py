# from apscheduler.schedulers.background import BackgroundScheduler
# from django_apscheduler.jobstores import DjangoJobStore
# from django_apscheduler.models import DjangoJobExecution
# from django.utils import timezone
# from .models import AppUser, Sharer

# scheduler = BackgroundScheduler()
# scheduler.add_jobstore(DjangoJobStore(), "default")

# def auto_unfollow_task(user_id, sharer_id):
#     # Perform auto-unfollow action
#     user = AppUser.objects.get(pk=user_id)
#     sharer = Sharer.objects.get(pk=sharer_id)
#     user.follows_tier1.remove(sharer)
#     user.follows_tier2.remove(sharer)
#     user.follows_tier3.remove(sharer)
#     user.save()

#     print(f"Automatically unfollowed sharer {sharer_id} for user {user_id}")

# # Start the scheduler
# scheduler.start()
