"""Cambio a BD local

Revision ID: 6f02a3a138a3
Revises: ff65f1cd462b
Create Date: 2025-03-01 17:31:09.812742

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6f02a3a138a3'
down_revision: Union[str, None] = 'ff65f1cd462b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
