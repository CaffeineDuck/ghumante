import typing as ty
from firebase_admin import auth
from firebase_admin.auth import verify_id_token  # type: ignore
from pathlib import Path
from firebase_admin import initialize_app, credentials

from firebase_admin.firestore import client as firestore_client

import logging


class FirebaseUser(ty.TypedDict):
    phone_number: str
    uid: str


class FirebaseClient:

    default_config_file = Path(__file__).parent / "private_key.json"

    def __init__(
        self,
        config_file=default_config_file,
        logger=logging.Logger(__name__),
    ):

        self._logger = logger

        creds = credentials.Certificate(config_file)
        self._app = initialize_app(creds)

        self._logger.info("Firebase Client initialized.")

        self._db = firestore_client(app=self._app)

        self._logger.info("Firestore Client initialized.")

    def verify_id_token(self, token: str) -> ty.Optional[FirebaseUser]:
        try:
            return verify_id_token(id_token=token, app=self._app)

        except Exception as e:
            self._logger.error(f"Error verifying token: {e}")
            return

    def get_all_users(self):
        users = auth.list_users(app=self._app).iterate_all()

        results: list[FirebaseUser] = []

        for user in users:
            result = FirebaseUser(phone_number=user.phone_number, uid=user.uid)
            results.append(result)

        return results

    def get_user_by_uid(self, uid: str):

        user = auth.get_user_by_uid(uid=uid, app=self._app)
        return FirebaseUser(phone_number=user.phone_number, uid=user.uid)
