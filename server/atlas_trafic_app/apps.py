from apscheduler.schedulers.background import BackgroundScheduler
from django.apps import AppConfig
from django.core.management import call_command


def reset_score_data():
    call_command("scheduler")


class AtlasTraficAppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "atlas_trafic_app"

    def ready(self):
        scheduler = BackgroundScheduler()
        scheduler.add_job(reset_score_data, "interval", minutes=5)
        scheduler.start()
