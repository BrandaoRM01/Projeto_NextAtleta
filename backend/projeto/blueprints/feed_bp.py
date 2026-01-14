from flask import Blueprint
from controller.feed import PostagemController
from controller.feed import ComentarioPostagemController
from controller.feed import CurtidaController

feed_bp = Blueprint("feed", __name__,url_prefix="/feed")

# =========================
# POSTAGENS
# =========================

# Criar postagem
feed_bp.add_url_rule(
    "/postagem",
    view_func=PostagemController.criar_postagem,
    methods=["POST"]
)

# Listar feed
feed_bp.add_url_rule(
    "/postagens",
    view_func=PostagemController.listar_feed,
    methods=["GET"]
)

# Detalhar postagem
feed_bp.add_url_rule(
    "/postagem/<int:postagem_id>",
    view_func=PostagemController.detalhar_postagem,
    methods=["GET"]
)

# Atualizar postagem
feed_bp.add_url_rule(
    "/postagem/<int:postagem_id>",
    view_func=PostagemController.atualizar_postagem,
    methods=["PUT"]
)

# 'Remover' postagem
feed_bp.add_url_rule(
    "/postagem/<int:postagem_id>",
    view_func=PostagemController.remover_postagem,
    methods=["DELETE"]
)

# =========================
# COMENTÁRIOS
# =========================

# Criar comentário em uma postagem
feed_bp.add_url_rule(
    "/postagem/<int:postagem_id>/comentario",
    view_func=ComentarioPostagemController.criar_comentario,
    methods=["POST"]
)

# Atualizar comentário
feed_bp.add_url_rule(
    "/comentario/<int:comentario_id>",
    view_func=ComentarioPostagemController.atualizar_comentario,
    methods=["PUT"]
)

# 'Remover' comentário
feed_bp.add_url_rule(
    "/comentario/<int:comentario_id>",
    view_func=ComentarioPostagemController.remover_comentario,
    methods=["DELETE"]
)

# =========================
# CURTIDAS
# =========================

# Curtir postagem ou comentário
feed_bp.add_url_rule(
    "/curtida",
    view_func=CurtidaController.criar_curtida,
    methods=["POST"]
)

# 'Remover' curtida
feed_bp.add_url_rule(
    "/curtida",
    view_func=CurtidaController.remover_curtida,
    methods=["DELETE"]
)